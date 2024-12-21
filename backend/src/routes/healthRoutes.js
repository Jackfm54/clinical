const express = require("express");
const { addHealthData } = require("../controllers/healthController");

const router = express.Router();

router.post("/add", addHealthData);

module.exports = router;
