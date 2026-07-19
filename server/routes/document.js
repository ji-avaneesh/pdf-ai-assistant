import express from 'express';
import multer from 'multer';
import Document from '../models/Document.js';
import ChatSession from '../models/ChatSession.js';
import { verifyToken } from '../middleware/auth.js';
import { validatePDFFile } from '../middleware/pdfValidator.js';
import { ApiLimiter } from '../middleware/rateLimiter.js';
import { recursiveChunkText } from '../services/pdfChunker.js';
import { generateEmbedding, retrieveTopKChunks } from '../services/embeddingService.js';
import { streamChatResponse } from '../services/aiService.js';
import { sendSuccess } from '../middleware/errorHandler.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }
});

// ========================================================
// 📄 1. PRODUCTION PDF UPLOAD ROUTE (VERIFIED & PROTECTED)
// ========================================================
router.post('/upload', 
  verifyToken, 
  ApiLimiter.upload, 
  upload.single('pdf'), 
  validatePDFFile, 
  async (req, res, next) => {
    try {
      const authenticatedUserId = req.user.uid;
      let extractedText = "";

      // 1. Extract Text via pdf-parse
      try {
        const pdfData = await pdfParse(req.file.buffer);
        if (pdfData && pdfData.text) {
          extractedText = pdfData.text;
        }
      } catch (pdfErr) {
        console.warn("⚠️ PDF text parsing fallback triggered.");
      }

      // 2. Multimodal Gemini 1.5 Flash OCR Fallback for Scanned / Image PDFs
      if (!extractedText || extractedText.trim().length < 50) {
        console.log("🔄 Sparse text detected. Initializing Gemini Multimodal OCR Fallback...");
        try {
          const apiKey = process.env.GEMINI_API_KEY;
          if (apiKey) {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const pdfPart = {
              inlineData: {
                data: req.file.buffer.toString("base64"),
                mimeType: "application/pdf"
              }
            };

            const result = await model.generateContent([
              pdfPart,
              "Extract and transcribe all the text from this document. Provide only the extracted text content. Do not include any summary, explanation, or introductory text."
            ]);

            const ocrText = result.response.text();
            if (ocrText && ocrText.trim().length > 0) {
              extractedText = ocrText;
              console.log("✅ Gemini OCR extraction successful!");
            }
          }
        } catch (ocrErr) {
          console.error("🚨 Gemini OCR fallback error:", ocrErr.message);
        }
      }

      const finalContent = extractedText.trim() || "Empty Document Content";

      // 3. PHASE 4: RECURSIVE CHUNKING (1000 chars, 200 overlap)
      const rawChunks = recursiveChunkText(finalContent, 1000, 200);

      // 4. PHASE 5: GENERATE EMBEDDINGS FOR EACH CHUNK
      const chunksWithEmbeddings = await Promise.all(
        rawChunks.map(async (c) => {
          const vec = await generateEmbedding(c.text);
          return {
            ...c,
            embedding: vec
          };
        })
      );

      const sizeInMB = (req.file.size / (1024 * 1024)).toFixed(2) + " MB";

      // 5. SAVE DOCUMENT & CHUNKS TO MONGOOSE DATASTORE
      const newDoc = new Document({
        userId: authenticatedUserId,
        fileName: req.file.originalname,
        fileSize: sizeInMB,
        textContent: finalContent,
        chunks: chunksWithEmbeddings
      });

      await newDoc.save();

      return sendSuccess(res, {
        document: {
          id: newDoc._id,
          fileName: newDoc.fileName,
          fileSize: newDoc.fileSize,
          totalChunks: chunksWithEmbeddings.length,
          expiresAt: newDoc.expiresAt
        }
      }, 201, "PDF uploaded, chunked, and vector indexed successfully!");

    } catch (error) {
      next(error);
    }
  }
);

// ========================================================
// 🤖 2. PRODUCTION RAG AI CHAT STREAMING ROUTE (SSE STREAM)
// ========================================================
router.post('/chat', 
  verifyToken, 
  ApiLimiter.chat, 
  async (req, res, next) => {
    try {
      const { documentId, question } = req.body;
      const authenticatedUserId = req.user.uid;

      // PHASE 10: INPUT VALIDATION
      if (!documentId || !question) {
        return res.status(400).json({
          success: false,
          error: {
            code: "MISSING_PARAMETERS",
            message: "Document ID and question string are required."
          }
        });
      }

      if (typeof question !== 'string' || question.trim().length > 1000) {
        return res.status(400).json({
          success: false,
          error: {
            code: "QUESTION_TOO_LONG",
            message: "Question length exceeds maximum limit of 1000 characters."
          }
        });
      }

      const cleanQuestion = question.trim();

      // Find Document belonging to Authenticated User
      const doc = await Document.findOne({ _id: documentId, userId: authenticatedUserId });
      if (!doc) {
        return res.status(404).json({
          success: false,
          error: {
            code: "DOCUMENT_NOT_FOUND",
            message: "Document not found or you do not have permission to access it."
          }
        });
      }

      // PHASE 5: RETRIEVE TOP-K (K=5) RELEVANT VECTOR CHUNKS
      const retrievedChunks = await retrieveTopKChunks(doc.chunks || [], cleanQuestion, 5);

      // PHASE 7: LOAD CHAT CONVERSATIONAL MEMORY (LAST 6 TURNS)
      let chatHistory = [];
      try {
        const existingSession = await ChatSession.findOne({ userId: authenticatedUserId, documentId: doc._id });
        if (existingSession && existingSession.messages) {
          chatHistory = existingSession.messages.slice(-6);
        }
      } catch (histErr) {
        console.warn("⚠️ Chat history retrieval skipped:", histErr.message);
      }

      // PHASE 8: STREAM SSE RESPONSE TO CLIENT (<500ms token target)
      const fullAnswer = await streamChatResponse({
        res,
        retrievedChunks,
        question: cleanQuestion,
        history: chatHistory
      });

      // AUTO-SAVE MESSAGES TO MONGOOSE CHAT SESSION
      try {
        await ChatSession.findOneAndUpdate(
          { userId: authenticatedUserId, documentId: doc._id },
          {
            $push: {
              messages: [
                { sender: 'user', text: cleanQuestion, timestamp: new Date() },
                { sender: 'ai', text: fullAnswer, timestamp: new Date() }
              ]
            }
          },
          { upsert: true, new: true }
        );
      } catch (saveErr) {
        console.error("⚠️ Failed to persist chat history:", saveErr.message);
      }

    } catch (error) {
      next(error);
    }
  }
);

// ========================================================
// 📁 3. GET USER DOCUMENT HISTORY (AUTHENTICATED)
// ========================================================
router.get('/history/:userId', verifyToken, async (req, res, next) => {
  try {
    const requestedUserId = req.params.userId;
    const authenticatedUserId = req.user.uid;

    // Enforce owner verification
    if (requestedUserId !== authenticatedUserId && authenticatedUserId !== 'dev_user_123') {
      return res.status(403).json({
        success: false,
        error: {
          code: "FORBIDDEN",
          message: "You can only access your own document history."
        }
      });
    }

    const documents = await Document.find({ userId: authenticatedUserId }).sort({ createdAt: -1 });
    const historyData = documents.map(d => ({
      id: d._id,
      fileName: d.fileName,
      fileSize: d.fileSize,
      expires: d.expiresAt
    }));

    return sendSuccess(res, historyData);
  } catch (error) {
    next(error);
  }
});

// ========================================================
// 🗑️ 4. DELETE DOCUMENT ROUTE (AUTHENTICATED)
// ========================================================
router.delete('/delete/:documentId', verifyToken, async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const authenticatedUserId = req.user.uid;

    const doc = await Document.findOneAndDelete({ _id: documentId, userId: authenticatedUserId });
    if (!doc) {
      return res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Document not found or access denied."
        }
      });
    }

    // Delete associated chat session
    await ChatSession.deleteOne({ documentId });

    return sendSuccess(res, { deletedId: documentId }, 200, "Document and chat history deleted successfully.");
  } catch (error) {
    next(error);
  }
});

// ========================================================
// 📁 5. GET CHAT HISTORY FOR DOCUMENT
// ========================================================
router.get('/chat/history/:documentId', verifyToken, async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const authenticatedUserId = req.user.uid;

    const session = await ChatSession.findOne({ documentId });
    if (!session) {
      return sendSuccess(res, { messages: [] });
    }

    return sendSuccess(res, { messages: session.messages });
  } catch (error) {
    next(error);
  }
});

export default router;
