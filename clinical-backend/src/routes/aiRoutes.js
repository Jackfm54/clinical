const express = require("express");
const { classifyHealthRisk } = require("../controllers/aiController");
const router = express.Router();

router.post("/classify", classifyHealthRisk);

module.exports = router;
