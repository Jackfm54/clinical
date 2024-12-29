const express = require("express");
const { saveHealthData } = require("../controllers/HealthDataController");

const router = express.Router();

router.post("/", saveHealthData);

module.exports = router;
