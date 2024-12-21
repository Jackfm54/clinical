const { startOllama, queryOllama } = require("../ia/ollamaClient");

const interactWithOllama = async (input) => {
  try {
    const model = "llama2";
    await startOllama(model); // Inicia el modelo si no está corriendo
    const response = await queryOllama(input); // Envía la pregunta al modelo
    return response;
  } catch (error) {
    console.error("Error en el servicio de Ollama:", error.message);
    throw new Error(error.message || "No se pudo obtener una respuesta de Ollama.");
  }
};

module.exports = { interactWithOllama };
