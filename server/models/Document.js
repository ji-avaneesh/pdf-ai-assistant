import mongoose from 'mongoose';

/**
 * PHASE 11: OPTIMIZED MONGOOSE DOCUMENT & CHUNK VECTOR SCHEMA
 */
const ChunkSchema = new mongoose.Schema({
  chunkIndex: { type: Number, required: true },
  text: { type: String, required: true },
  charLength: { type: Number },
  embedding: { type: [Number], default: [] }
}, { _id: false });

const DocumentSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true, 
    index: true 
  },
  fileName: { 
    type: String, 
    required: true 
  },
  fileSize: { 
    type: String, 
    required: true 
  },
  textContent: { 
    type: String, 
    default: "" 
  },
  chunks: [ChunkSchema],
  expiresAt: { 
    type: Date, 
    default: () => new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), 
    index: { expires: 0 } 
  }
}, { 
  timestamps: true 
});

// Create compound index for fast user queries
DocumentSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.models.Document || mongoose.model('Document', DocumentSchema);
