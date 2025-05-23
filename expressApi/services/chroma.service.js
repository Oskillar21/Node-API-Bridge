// services/chroma.service.js
const axios = require("axios");

const CHROMA_API_URL = process.env.CHROMA_API_URL || "http://localhost:8002";

/**
 * Consulta a ChromaLoad para obtener los documentos más similares a un embedding.
 * @param {number[]} embedding - Vector de embedding generado.
 * @param {number} top_k - Cantidad de resultados más cercanos que se desean.
 * @returns {Promise<Object[]>} Lista de documentos relacionados.
 */
async function queryChroma(embedding, top_k = 3) {
  try {
    const response = await axios.post(`${CHROMA_API_URL}/query_embedding`, {
      embedding,
      top_k,
    });

    return response.data.results;
  } catch (error) {
    console.error(" Error al consultar ChromaLoaddddd:", error.message);
    throw error;
  }
}

module.exports = { queryChroma };
