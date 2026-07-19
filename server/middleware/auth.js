import admin from '../config/firebaseAdmin.js';

/**
 * PHASE 1: MANDATION SECURITY - FIREBASE JWT BEARER TOKEN VERIFICATION
 */
export async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Access denied. Authentication Bearer token missing."
      }
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.email?.split('@')[0] || 'Authenticated User'
    };
    return next();
  } catch (err) {
    // Development fallback mode for testing client requests with dev tokens
    if (token.startsWith('dev_token_') || token.startsWith('google_dev_')) {
      const devUid = req.body.userId || req.query.userId || 'dev_user_123';
      req.user = {
        uid: devUid,
        email: 'dev@gmail.com',
        name: 'Developer User'
      };
      return next();
    }

    console.error("🚨 Token Verification Failed:", err.message);
    return res.status(403).json({
      success: false,
      error: {
        code: "FORBIDDEN",
        message: "Invalid or expired authentication token. Please sign in again."
      }
    });
  }
}
