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
    // Enviar mensaje ***Cambiar la url oscar mongolo
    const response = await axios.post('http://localhost:8000/embeddings', {
      message: message,
    });

    console.log("Message del ask.controller", message);
    console.log("Response del ask.controller", response.data);
  
    // Devolver respuesta
    res.json(response.data);

  } catch (error) {
    console.error("Error en handleAsk:", error);
    console.error("Error en handleAsk:", error.message);

    // Manejo de errores chat
    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data.error || "Error desde la segunda API.",
      });
    }

    res.status(500).json({ error: "Ocurrió un error al comunicarse con la segunda API." });
  }
}


module.exports = { handleAsk };
