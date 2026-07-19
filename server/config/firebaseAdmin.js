import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID || "pdf-ai-assistant";
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY 
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') 
      : undefined;

    if (clientEmail && privateKey) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey
        })
      });
      console.log("✅ Firebase Admin SDK Initialized with Service Account.");
    } else {
      admin.initializeApp({ projectId });
      console.log("✅ Firebase Admin SDK Initialized with Project ID Context.");
    }
  } catch (err) {
    console.warn("⚠️ Firebase Admin SDK fallback initialization:", err.message);
  }
}

export default admin;
