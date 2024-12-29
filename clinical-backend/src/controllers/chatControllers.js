const { inferRisk } = require("../services/aiServices");

const getMedicalChatResponse = async (req, res) => {
  try {
    const { healthData } = req.body;
    console.log("Received health data:", healthData);

    if (!healthData || !healthData.heartRate || !healthData.bloodPressure || !healthData.oxygenLevel) {
      console.error("Invalid health data provided.");
      return res.status(400).json({ message: "Invalid health data provided." });
    }

    const analysis = await inferRisk(healthData);
    console.log("AI Analysis Result:", analysis);

    const recommendations = `Based on the analysis:
      - Risk Level: ${analysis.riskLevel}.
      - Recommendations: ${analysis.details || "Consult your doctor for further guidance."}`;

    res.status(200).json({ recommendations });
  } catch (error) {
    console.error("Error in Chat Medical:", error.message);
    res.status(500).json({ message: "Unable to provide recommendations at the moment." });
  }
};

module.exports = { getMedicalChatResponse };
