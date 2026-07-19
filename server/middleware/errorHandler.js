/**
 * PHASE 9: STANDARDIZED API ERROR HANDLING & RESPONSE FORMATTING
 */

export function errorHandler(err, req, res, next) {
  console.error("🚨 Central Uncaught Server Error:", err);

  const statusCode = err.status || err.statusCode || 500;
  const errorCode = err.code || "INTERNAL_SERVER_ERROR";
  const errorMessage = err.message || "An unexpected system error occurred on the server.";

  return res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message: errorMessage
    }
  });
}

/**
 * Standardized Success Response Wrapper Utility
 */
export function sendSuccess(res, data = {}, statusCode = 200, message = "Operation completed successfully") {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
}
