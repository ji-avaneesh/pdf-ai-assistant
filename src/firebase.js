import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  sendPasswordResetEmail, 
  setPersistence, 
  browserLocalPersistence, 
  browserSessionPersistence,
  signOut,
  updateProfile
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

// Firebase Configuration with env fallback parameters
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB_PDF_AI_Assistant_Key_Demo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "pdf-ai-assistant.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "pdf-ai-assistant",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "pdf-ai-assistant.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "987654321012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:987654321012:web:abcdef1234567890"
};

// Initialize Firebase App singleton
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Custom Google Auth Scope Configuration
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signOut,
  updateProfile,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
};

/**
 * Save minimal user profile in Firestore according to security guidelines
 */
export async function saveUserProfile(user, additionalData = {}) {
  if (!user) return;
  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || additionalData.name || 'User',
        email: user.email,
        photoURL: user.photoURL || null,
        emailVerified: user.emailVerified,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        provider: user.providerData[0]?.providerId || 'password',
        role: 'user',
        ...additionalData
      });
    } else {
      await setDoc(userRef, {
        emailVerified: user.emailVerified,
        lastLoginAt: serverTimestamp()
      }, { merge: true });
    }
  } catch (err) {
    console.warn("Firestore user profile save skipped/fallback active:", err.message);
  }
}
