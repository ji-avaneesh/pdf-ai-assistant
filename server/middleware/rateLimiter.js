import rateLimit from 'express-rate-limit';

/**
 * PHASE 2: API SECURITY - RATE LIMITING MIDDLEWARE
 */

// General API rate limiter (100 requests per 15 minutes)
export className ApiLimiter {
  static general = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      error: {
        code: "TOO_MANY_REQUESTS",
        message: "Too many requests from this IP. Please try again after 15 minutes."
      }
    }
  });

  // Strict Upload rate limiter (20 uploads per 15 minutes)
  static upload = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      error: {
        code: "UPLOAD_LIMIT_EXCEEDED",
        message: "PDF upload limit exceeded. Maximum 20 uploads allowed per 15-minute window."
      }
    }
  });

  // Chat Query rate limiter (60 queries per 1 minute)
  static chat = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      error: {
        code: "CHAT_LIMIT_EXCEEDED",
        message: "Chat rate limit exceeded. Please wait a few seconds before asking your next question."
      }
    }
  });
}
