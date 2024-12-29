const HealthData = require("../models/healthData");

// Enregistrer les données de santé
const saveHealthData = async (req, res) => {
  try {
    const { userId, heartRate, bloodPressure, oxygenLevel } = req.body;

    const healthData = await HealthData.create({
      userId,
      heartRate,
      bloodPressure,
      oxygenLevel,
    });

    res.status(201).json({ success: true, data: healthData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { saveHealthData };
