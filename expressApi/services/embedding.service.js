// services/embedding.service.js

async function generateEmbedding(text) {
  // Simula un embedding de 384 dimensiones como all-MiniLM-L6-v2
  const fakeEmbedding = Array.from({ length: 384 }, () => Math.random());

  // Simula retardo de procesamiento
  await new Promise((resolve) => setTimeout(resolve, 100));

  return fakeEmbedding;
}

module.exports = { generateEmbedding };
