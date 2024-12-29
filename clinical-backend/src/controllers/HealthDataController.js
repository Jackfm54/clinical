const HealthData = require("../models/healthData");

const saveHealthData = async (req, res) => {
  try {
    const { userId, heartRate, bloodPressure, oxygenLevel } = req.body;

    const healthData = new HealthData({
      userId,
      heartRate,
      bloodPressure,
      oxygenLevel,
    });

    await healthData.save();
    res.status(201).json({ message: "Health data saved successfully", healthData });
  } catch (error) {
    res.status(500).json({ message: "Failed to save health data", error: error.message });
  }
};

const getHealthDataByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const healthData = await HealthData.find({ userId });

    if (!healthData.length) {
      return res.status(404).json({ message: "No health data found for this user" });
    }

    res.status(200).json(healthData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch health data", error: error.message });
  }
};

module.exports = { saveHealthData, getHealthDataByUser };
