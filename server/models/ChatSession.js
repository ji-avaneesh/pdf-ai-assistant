import mongoose from 'mongoose';

const chatSessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    documentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
        required: true,
        unique: true // One thread session per document/user pair
    },
    messages: [
        {
            sender: {
                type: String,
                enum: ['user', 'ai'],
                required: true
            },
            text: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ],
    // Automatically delete chat history after 15 days, matching the document TTL
    expiresAt: {
        type: Date,
        default: () => new Date(+new Date() + 15 * 24 * 60 * 60 * 1000),
        index: { expires: 0 }
    }
}, { timestamps: true });

const ChatSession = mongoose.model('ChatSession', chatSessionSchema);
export default ChatSession;
