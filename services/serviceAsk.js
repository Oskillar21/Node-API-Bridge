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

/*
const API_KEY = 'TU_API_KEY_AQUI';

async function consultaCorta(prompt) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 50,       // Limita la respuesta a ~30-35 palabras
        temperature: 0.5,     // Controla la creatividad
        top_p: 1,
        n: 1,
        stop: ['\n']
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const texto = response.data.choices[0].text.trim();
    console.log(texto);
    return texto;
  } catch (error) {
    console.error('Error al consultar la API de OpenAI:', error.response?.data || error.message);
    return 'Ocurrió un error al obtener la respuesta.';
  }
}

// Ejemplo de uso
consultaCorta("¿Qué es una API?");


*/
