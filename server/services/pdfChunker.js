/**
 * PHASE 4: RECURSIVE DOCUMENT CHUNKING SERVICE
 * Chunk Size: 1000 characters
 * Overlap: 200 characters
 */

export function recursiveChunkText(text, chunkSize = 1000, overlap = 200) {
  if (!text || typeof text !== 'string') return [];

  const cleanText = text.replace(/\r\n/g, '\n').trim();
  if (cleanText.length <= chunkSize) {
    return [{
      chunkIndex: 0,
      text: cleanText,
      charLength: cleanText.length
    }];
  }

  const chunks = [];
  let start = 0;
  let chunkIndex = 0;

  while (start < cleanText.length) {
    let end = start + chunkSize;

    if (end < cleanText.length) {
      // Try to break at paragraph boundary, sentence end (. ! ?), or whitespace
      const breakPoints = [
        cleanText.lastIndexOf('\n\n', end),
        cleanText.lastIndexOf('\n', end),
        cleanText.lastIndexOf('. ', end),
        cleanText.lastIndexOf('? ', end),
        cleanText.lastIndexOf('! ', end),
        cleanText.lastIndexOf(' ', end)
      ];

      // Find the best break point that is after (start + chunkSize / 2)
      const validBreak = breakPoints.find(p => p > start + Math.floor(chunkSize / 2));
      if (validBreak !== undefined && validBreak !== -1) {
        end = validBreak + 1; // Include punctuation or space
      }
    } else {
      end = cleanText.length;
    }

    const chunkContent = cleanText.slice(start, end).trim();
    if (chunkContent.length > 0) {
      chunks.push({
        chunkIndex,
        text: chunkContent,
        charLength: chunkContent.length
      });
      chunkIndex++;
    }

    if (end >= cleanText.length) break;

    // Advance start with specified overlap (200 characters)
    start = Math.max(start + 1, end - overlap);
  }

  return chunks;
}
