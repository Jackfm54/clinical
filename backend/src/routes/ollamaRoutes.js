const express = require("express");
const { chatWithOllama } = require("../controllers/ollamaController");

const router = express.Router();

// Ruta para detener el modelo de Ollama
const { stopOllama } = require("../ia/ollamaClient");

router.post("/stop", (req, res) => {
  stopOllama();
  res.status(200).json({ message: "Modelo detenido correctamente." });
});

// Ruta para interactuar con Ollama
router.post("/chat", chatWithOllama);

module.exports = router;
