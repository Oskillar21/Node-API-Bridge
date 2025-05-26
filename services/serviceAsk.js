const axios = require("axios");

async function handleAsk(message) {
  if (!message) {
    throw new Error("No se recibió ningún mensaje.");
  }

  try {
    // Enviar mensaje a la segunda API
    const response = await axios.post('http://api-load:8000/embeddings', {
      message: message,
    });

    // Devolver respuesta
    return response.data;

  } catch (error) {
    // Manejo de errores
    if (error.response) {
      throw new Error(error.response.data.error || "Error desde Load-API.");
    }
    throw new Error("Ocurrió un error al comunicarse con Load-API.");
  }
}

module.exports = { handleAsk };