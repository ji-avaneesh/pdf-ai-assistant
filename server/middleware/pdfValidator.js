/**
 * PHASE 3: PDF MAGIC BYTE & ENCRYPTION VALIDATOR
 */
export function validatePDFFile(req, res, next) {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: {
        code: "NO_FILE_UPLOADED",
        message: "No file was attached to the upload request."
      }
    });
  }

  const buffer = req.file.buffer;

  // 1. Check File Size Limit (50MB)
  const maxSize = 50 * 1024 * 1024;
  if (buffer.length > maxSize) {
    return res.status(400).json({
      success: false,
      error: {
        code: "FILE_TOO_LARGE",
        message: "PDF exceeds maximum allowable file size limit of 50MB."
      }
    });
  }

  // 2. Validate PDF Magic Header Bytes: %PDF- (hex: 0x25 0x50 0x44 0x46)
  const magicBytes = buffer.slice(0, 4).toString('ascii');
  if (magicBytes !== '%PDF') {
    return res.status(422).json({
      success: false,
      error: {
        code: "INVALID_PDF_FORMAT",
        message: "Corrupted file payload. File magic bytes do not match standard PDF header signature (%PDF-)."
      }
    });
  }

  // 3. Inspect for Encrypted/Password Protected Indicators in Buffer
  const bufferString = buffer.toString('binary', 0, Math.min(buffer.length, 10000));
  if (bufferString.includes('/Encrypt') || bufferString.includes('/Filter/Standard')) {
    // Double-check if it requires password
    if (bufferString.includes('/P -') || bufferString.includes('/V 1') || bufferString.includes('/V 2') || bufferString.includes('/V 4') || bufferString.includes('/V 5')) {
      return res.status(422).json({
        success: false,
        error: {
          code: "PASSWORD_PROTECTED_PDF",
          message: "This PDF is password-protected or encrypted. Please remove password encryption before uploading."
        }
      });
    }
  }

  next();
}
