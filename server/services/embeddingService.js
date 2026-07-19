import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * PHASE 5: VECTOR EMBEDDING & COSINE SIMILARITY RETRIEVAL (RAG)
 */

/**
 * Generate 768-dimensional vector embedding for text using Google text-embedding-004
 */
export async function generateEmbedding(text) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
      const result = await model.embedContent(text.slice(0, 2048));
      if (result.embedding && result.embedding.values) {
        return result.embedding.values;
      }
    }
    return generateNormalizedTermVector(text);
  } catch (err) {
    console.warn("⚠️ Gemini Embedding API fallback to term vector:", err.message);
    return generateNormalizedTermVector(text);
  }
}

/**
 * Calculate Cosine Similarity between two vector float arrays
 */
export function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Retrieve Top-K (K=5) most relevant chunks matching query embedding
 */
export async function retrieveTopKChunks(chunks, queryText, topK = 5) {
  if (!chunks || chunks.length === 0) return [];

  // Generate query embedding
  const queryVector = await generateEmbedding(queryText);

  // Score chunks using cosine similarity
  const scoredChunks = chunks.map(chunk => {
    let sim = 0;
    if (chunk.embedding && chunk.embedding.length > 0) {
      sim = cosineSimilarity(queryVector, chunk.embedding);
    } else {
      // Keyword fallback match if embeddings not cached
      const keywords = queryText.toLowerCase().split(/\s+/).filter(w => w.length > 2);
      const chunkLower = chunk.text.toLowerCase();
      let matchCount = 0;
      keywords.forEach(kw => {
        if (chunkLower.includes(kw)) matchCount++;
      });
      sim = matchCount / Math.max(1, keywords.length);
    }
    return { ...chunk, score: sim };
  });

  // Sort by score descending and return top K
  scoredChunks.sort((a, b) => b.score - a.score);
  return scoredChunks.slice(0, topK);
}

/**
 * Normalized Term Vector Generator for robust offline / fallback vector similarity
 */
function generateNormalizedTermVector(text) {
  const dim = 768;
  const vector = new Array(dim).fill(0);
  const words = (text || "").toLowerCase().split(/\W+/).filter(w => w.length > 2);

  words.forEach(word => {
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash = (hash << 5) - hash + word.charCodeAt(i);
      hash |= 0;
    }
    const idx = Math.abs(hash) % dim;
    vector[idx] += 1.0;
  });

  // Normalize vector to unit length
  let norm = 0;
  for (let i = 0; i < dim; i++) norm += vector[i] * vector[i];
  norm = Math.sqrt(norm);
  if (norm > 0) {
    for (let i = 0; i < dim; i++) vector[i] /= norm;
  }
  return vector;
}
