const mongoose = require("mongoose");
const HealthData = require("../models/healthData");

const addHealthData = async (req, res) => {
  const { userId, heartRate, bloodPressure, oxygenLevel } = req.body;

  try {
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "El userId no es un ObjectId válido." });
    }

    const healthData = await HealthData.create({
      userId: new mongoose.Types.ObjectId(userId),
      heartRate,
      bloodPressure,
      oxygenLevel,
    });

    res.status(201).json(healthData);
  } catch (error) {
    console.error("Error al agregar datos de salud:", error.message);
    res.status(500).json({ message: "Error al agregar datos de salud", error });
  }
};

module.exports = { addHealthData };
