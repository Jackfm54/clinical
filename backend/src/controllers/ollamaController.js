const { interactWithOllama } = require("../services/ollamaService");

const chatWithOllama = async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ message: "El campo 'input' es obligatorio." });
  }

  try {
    const response = await interactWithOllama(input);
    res.status(200).json({ message: response });
  } catch (error) {
    res.status(500).json({ message: "Error al comunicarse con Ollama.", error });
  }
};

module.exports = { chatWithOllama };
