import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import hpp from 'hpp';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import documentRoutes from './routes/document.js';
import { ApiLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Security & Optimization Middlewares (Phase 2)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());
app.use(hpp());
app.use(morgan('dev'));

// Express CORS Configuration
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// General Rate Limiter
app.use('/api/', ApiLimiter.general);

// Routes Linking 
app.use('/api/auth', authRoutes);
app.use('/api/document', documentRoutes);

app.get('/', (req, res) => {
    res.json({ 
      success: true, 
      message: '🚀 PDF AI Assistant Backend Server is Active, Secure & Protected!',
      version: '2.0.0-production'
    });
});

// Centralized Error Handling Middleware (Phase 9)
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/pdf_ai_assistant";

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB connected successfully!');
        app.listen(PORT, '0.0.0.0', () => console.log(`🌍 Server active on port: ${PORT}`));
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
    });
