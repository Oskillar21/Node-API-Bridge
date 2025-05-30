const axios = require("axios");

async function handleAsk(message) {
  if (!message) {
    throw new Error("No se recibió ningún mensaje.");
  }

  try {
    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "Eres un asistente útil. Responde en no más de 40 palabras.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 60, // Aprox. 40 palabras
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return {
      response: openaiResponse.data.choices[0].message.content.trim(),
    };
  } catch (error) {
    console.error("Error desde OpenAI:", error.message);
    if (error.response) {
      console.error(error.response.data);
    }
    throw new Error("Error al consultar la IA.");
  }
}

module.exports = { handleAsk };
