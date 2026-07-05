import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import documentRoutes from './routes/document.js';

dotenv.config();

const app = express();

// एक्सप्रेस v5+ के लिए सबसे स्टेबल CORS कॉन्फ़िगरेशन
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes Linking
app.use('/api/auth', authRoutes);
app.use('/api/document', documentRoutes); // यह मुख्य रूट है, इसके अंदर अब /chat एक्टिव है

app.get('/', (req, res) => {
    res.send('🚀 PDF AI Assistant Backend Server is Running Perfectly with AI Nodes!');
});

const PORT = process.env.PORT || 5001; // Front-end 5001 पोर्ट पर रिक्वेस्ट भेज रहा है
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB connected successfully!');
        app.listen(PORT, '0.0.0.0', () => console.log(`🌍 Server active on port: ${PORT}`));
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
    });
