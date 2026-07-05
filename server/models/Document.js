import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
        required: true
    },
    // आपके कहे अनुसार 15 दिन में ऑटो-डिलीट (TTL Index) करने के लिए ⏳
    expiresAt: {
        type: Date,
        default: () => new Date(+new Date() + 15 * 24 * 60 * 60 * 1000), // आज से ठीक 15 दिन बाद
        index: { expires: 0 } // मोंगोडीबी इस समय पर इसे खुद डिलीट कर देगा
    }
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);
export default Document;
