import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        // जब पहली बार OTP से लॉगिन होगा, तो हम डिफॉल्ट नाम रख सकते हैं या बाद में अपडेट करा सकते हैं
        default: "Active Cloud Node"
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        // sparse: true का मतलब है कि जिन यूज़र्स के पास ईमेल नहीं है (केवल फोन है), मोंगोडीबी उन्हें रोकने के बजाय unique चेक को इग्नोर कर देगा
        unique: true,
        sparse: true
    },
    password: {
        type: String,
        // सोशल या ओटीपी लॉगिन के लिए पासवर्ड जरूरी नहीं है, इसलिए required हटा दिया है
    },
    mobile: {
        type: String,
        trim: true,
        unique: true,
        sparse: true // केवल ओटीपी यूज़र्स के लिए यूनिक इंडेक्स बनाएगा
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
