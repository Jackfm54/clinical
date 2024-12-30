const { inferRisk } = require("../services/aiServices");

const getMedicalChatResponse = async (req, res) => {
  try {
    const { healthData } = req.body;

    if (!healthData || !healthData.heartRate || !healthData.bloodPressure || !healthData.oxygenLevel) {
      return res.status(400).json({ message: "Invalid health data provided." });
    }

    // Lógica de inferencia o análisis
    const analysis = await inferRisk(healthData);
    res.status(200).json({ reply: analysis });
  } catch (error) {
    console.error("Error in Chat Medical:", error.message);
    res.status(500).json({ message: "Unable to provide recommendations at the moment." });
  }
};

module.exports = { getMedicalChatResponse };
