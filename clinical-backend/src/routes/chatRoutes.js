const express = require("express");
const { getMedicalChatResponse } = require("../controllers/chatControllers");
const router = express.Router();

// Ruta para manejar solicitudes al chat médico
router.post("/", getMedicalChatResponse);

module.exports = router;
