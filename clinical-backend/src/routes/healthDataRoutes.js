const express = require("express");
const { saveHealthData } = require("../controllers/healthDataController");

const router = express.Router();

router.post("/", saveHealthData);

module.exports = router; // Vérifiez que ceci est correct
