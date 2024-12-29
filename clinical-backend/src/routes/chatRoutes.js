const express = require("express");
const { getMedicalChatResponse } = require("../controllers/chatController");
const router = express.Router();

// Endpoint para obtener recomendaciones médicas
router.post("/", getMedicalChatResponse);

module.exports = router;
