import express from 'express';
import multer from 'multer';
import Document from '../models/Document.js';
import ChatSession from '../models/ChatSession.js';
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

// 📄 1. PDF UPLOAD ENDPOINT
router.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
        const { userId } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded!" });
        }

        let extractedText = "";
        try {
            const pdfData = await pdfParse(req.file.buffer);
            if (pdfData && pdfData.text) {
                extractedText = pdfData.text; // Keep untrimmed text to preserve structure for Gemini parsing
            }
        } catch (pdfErr) {
            console.log("PDF text parsing error.");
        }

        // If the extracted text is empty or sparse, trigger Gemini multimodal OCR
        if (!extractedText || extractedText.trim().length < 50) {
            console.log("🔄 Sparse text detected. Initializing Gemini Multimodal OCR fallback...");
            try {
                const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
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
            } catch (ocrErr) {
                console.error("🚨 Gemini OCR fallback error:", ocrErr);
            }
        }

        const sizeInMB = (req.file.size / (1024 * 1024)).toFixed(2) + " MB";

        const newDoc = new Document({
            userId,
            fileName: req.file.originalname,
            fileSize: sizeInMB,
            textContent: extractedText || "Empty Document Content"
        });

        await newDoc.save();

        res.status(201).json({
            message: "PDF uploaded and analyzed successfully!",
            document: {
                id: newDoc._id,
                fileName: newDoc.fileName,
                fileSize: newDoc.fileSize,
                expiresAt: newDoc.expiresAt
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📄 2. CLOUD VAULT HISTORY ENDPOINT
router.get('/history/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const documents = await Document.find({ userId }).sort({ createdAt: -1 });
        const historyData = documents.map(doc => ({
            id: doc._id,
            fileName: doc.fileName,
            fileSize: doc.fileSize,
            expires: doc.expiresAt
        }));
        res.status(200).json(historyData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🤖 3. ULTRA-ADVANCED GEMINI-POWERED TEXT PARSING ENGINE
router.post('/chat', async (req, res) => {
    try {
        const { documentId, question } = req.body;

        if (!documentId || !question) {
            return res.status(400).json({ message: "Document ID and question are required!" });
        }

        const doc = await Document.findById(documentId);
        if (!doc) {
            return res.status(404).json({ message: "Document not found!" });
        }

        const docText = doc.textContent || "";

        // Initialize GoogleGenerativeAI with API Key
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // Use gemini-1.5-flash for faster responses
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `You are an expert PDF AI Assistant. You are provided with the text content of a document.
Your task is to answer the user's question ACCURATELY and STRICTLY based ONLY on the provided document text context.
If the answer cannot be found in the document, reply: "I cannot find this information in the document."
Adapt your response tone and language (English, Hindi, Hinglish) matching the user's question.
Format your output cleanly using markdown bullet points and structured lines. Make your responses interactive and direct.`
        });

        const prompt = `Document Content:
"""
${docText}
"""

User Question: "${question}"`;

        const result = await model.generateContent(prompt);
        const answer = result.response.text();

        // Auto-save message history to MongoDB
        try {
            await ChatSession.findOneAndUpdate(
                { userId: doc.userId, documentId: doc._id },
                {
                    $push: {
                        messages: [
                            { sender: 'user', text: question, timestamp: new Date() },
                            { sender: 'ai', text: answer, timestamp: new Date() }
                        ]
                    }
                },
                { upsert: true, new: true }
            );
        } catch (dbErr) {
            console.error("⚠️ Failed to auto-save chat message history:", dbErr);
        }

        res.status(200).json({ answer });

    } catch (error) {
        console.error("🚨 Gemini AI Router Error:", error);
        res.status(500).json({ error: "Failed to process chat with Gemini AI Engine." });
    }
});

// 📁 4. GET CHAT HISTORY FOR A DOCUMENT
router.get('/chat/history/:documentId', async (req, res) => {
    try {
        const { documentId } = req.params;

        if (!documentId) {
            return res.status(400).json({ message: "Document ID is required!" });
        }

        const session = await ChatSession.findOne({ documentId });
        if (!session) {
            return res.status(200).json({ messages: [] });
        }

        return res.status(200).json({ messages: session.messages });

    } catch (error) {
        console.error("🚨 Get Chat History Error:", error);
        res.status(500).json({ error: "Failed to load chat history." });
    }
});

export default router;
