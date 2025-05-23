const axios = require("axios");
const { generateEmbedding } = require("../services/embedding.service");
const { queryChroma } = require("../services/chroma.service");

// POST /ask
async function handleAsk(req, res) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No se recibió ningún mensaje." });
  }

  try {
    // 1. Generar embedding del mensaje
    const embedding = await generateEmbedding(message);

    // 2. Consultar ChromaLoad con ese embedding
    const relatedDocs = await queryChroma(embedding, 3); // top_k = 3

    // 3. En esta versión, devolvemos directamente los documentos
    res.json({
      result: relatedDocs,
    });
  } catch (error) {
    console.error(" Error en handleAsk:", error.message);
    res
      .status(500)
      .json({ error: "Ocurrió un error al procesar la solicitud." });
  }
}

module.exports = { handleAsk };
