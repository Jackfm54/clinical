const HealthData = require("../models/healthData");

const addHealthData = async (req, res) => {
  const { userId, heartRate, bloodPressure, oxygenLevel } = req.body;
  try {
    const data = await HealthData.create({ userId, heartRate, bloodPressure, oxygenLevel });
    res.status(201).json({ message: "Health data added successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Error adding health data", error });
  }
};

module.exports = { addHealthData };
