const axios = require("axios");

const ollamaClient = axios.create({
  baseURL: "https://api.ollama.ai", // Modifiez si nécessaire
  headers: {
    "Content-Type": "application/json",
  },
});

// Effectuer une requête au modèle
const queryOllama = async (input) => {
  try {
    const response = await ollamaClient.post("/query", {
      model: "ollama-3.2", // Spécifiez le modèle
      input,
    });
    return response.data;
  } catch (error) {
    console.error("Error querying Ollama:", error.message);
    throw new Error("Failed to get response from Ollama.");
  }
};

module.exports = { queryOllama };
