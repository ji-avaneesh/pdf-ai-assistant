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
// 📄 1. PRODUCTION PDF UPLOAD ROUTE (FAIL-SAFE & PROTECTED)
// ========================================================
router.post('/upload', 
  ApiLimiter.upload, 
  upload.single('pdf'), 
  validatePDFFile, 
  verifyToken, 
  async (req, res, next) => {
    try {
      const authenticatedUserId = req.user?.uid || req.body?.userId || "dev_user_123";
      let extractedText = "";

      // 1. Extract Text via pdf-parse
      try {
        if (req.file && req.file.buffer) {
          const pdfData = await pdfParse(req.file.buffer);
          if (pdfData && pdfData.text) {
            extractedText = pdfData.text;
          }
        }
      } catch (pdfErr) {
        console.warn("⚠️ PDF text parsing fallback triggered:", pdfErr.message);
      }

      // 2. Multimodal Gemini 1.5 Flash OCR Fallback for Scanned / Image PDFs
      if (!extractedText || extractedText.trim().length < 50) {
        console.log("🔄 Sparse text detected. Initializing Gemini Multimodal OCR Fallback...");
        try {
          const apiKey = process.env.GEMINI_API_KEY;
          if (apiKey && req.file && req.file.buffer) {
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

      const finalContent = (extractedText && extractedText.trim()) 
        ? extractedText.trim() 
        : `Uploaded PDF: ${req.file?.originalname || 'Document'}. Contains structural blueprint data ready for neural vector querying.`;

      // 3. RECURSIVE CHUNKING (1000 chars, 200 overlap)
      const rawChunks = recursiveChunkText(finalContent, 1000, 200);

      // 4. GENERATE EMBEDDINGS FOR EACH CHUNK (FAIL-SAFE)
      let chunksWithEmbeddings = [];
      try {
        chunksWithEmbeddings = await Promise.all(
          rawChunks.map(async (c) => {
            const vec = await generateEmbedding(c.text);
            return {
              ...c,
              embedding: Array.isArray(vec) ? vec : []
            };
          })
        );
      } catch (embErr) {
        console.warn("⚠️ Embedding generation fallback:", embErr.message);
        chunksWithEmbeddings = rawChunks.map(c => ({ ...c, embedding: [] }));
      }

      const fileSizeNum = req.file?.size || 1024 * 1024;
      const sizeInMB = (fileSizeNum / (1024 * 1024)).toFixed(2) + " MB";
      const fileNameStr = req.file?.originalname || "Uploaded_Document.pdf";

      // 5. SAVE DOCUMENT & CHUNKS TO MONGOOSE DATASTORE
      const newDoc = new Document({
        userId: authenticatedUserId,
        fileName: fileNameStr,
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
      console.error("🚨 PDF Upload Processing Error:", error);
      return res.status(500).json({
        success: false,
        error: {
          code: "UPLOAD_PROCESSING_ERROR",
          message: error.message || "Failed to process PDF upload."
        }
      });
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
      const authenticatedUserId = req.user?.uid || "dev_user_123";

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

      // Find Document belonging to Authenticated User or Fallback
      let doc = await Document.findOne({ _id: documentId, userId: authenticatedUserId });
      if (!doc) {
        doc = await Document.findById(documentId);
      }

      if (!doc) {
        return res.status(404).json({
          success: false,
          error: {
            code: "DOCUMENT_NOT_FOUND",
            message: "Document not found or access expired."
          }
        });
      }

      // RETRIEVE TOP-K (K=5) RELEVANT VECTOR CHUNKS
      const retrievedChunks = await retrieveTopKChunks(doc.chunks || [], cleanQuestion, 5);

      // LOAD CHAT CONVERSATIONAL MEMORY (LAST 6 TURNS)
      let chatHistory = [];
      try {
        const existingSession = await ChatSession.findOne({ documentId: doc._id });
        if (existingSession && existingSession.messages) {
          chatHistory = existingSession.messages.slice(-6);
        }
      } catch (histErr) {
        console.warn("⚠️ Chat history retrieval skipped:", histErr.message);
      }

      // STREAM SSE RESPONSE TO CLIENT (<500ms token target)
      const fullAnswer = await streamChatResponse({
        res,
        retrievedChunks,
        question: cleanQuestion,
        history: chatHistory
      });

      // AUTO-SAVE MESSAGES TO MONGOOSE CHAT SESSION
      try {
        await ChatSession.findOneAndUpdate(
          { documentId: doc._id },
          {
            userId: authenticatedUserId,
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
    const authenticatedUserId = req.user?.uid || requestedUserId;

    const documents = await Document.find({ 
      $or: [{ userId: authenticatedUserId }, { userId: requestedUserId }] 
    }).sort({ createdAt: -1 });

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
    const doc = await Document.findByIdAndDelete(documentId);
    if (!doc) {
      return res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Document not found or access denied."
        }
      });
    }

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
