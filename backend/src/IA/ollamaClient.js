const axios = require("axios");

const ollamaClient = axios.create({
  baseURL: "https://api.ollama.ai", // Cambiar si es necesario
  headers: {
    Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`, // Clave API en .env
    "Content-Type": "application/json",
  },
});

// Realizar una consulta al modelo
const queryOllama = async (input) => {
  try {
    const response = await ollamaClient.post("/query", {
      model: "ollama-3.2", // Especificar el modelo
      input,
    });
    return response.data;
  } catch (error) {
    console.error("Error querying Ollama:", error.message);
    throw new Error("Failed to get response from Ollama.");
  }
};

module.exports = { queryOllama };
