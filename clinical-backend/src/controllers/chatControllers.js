const { inferRisk } = require("../services/aiServices");

const getMedicalChatResponse = async (req, res) => {
  try {
    const { healthData } = req.body;

    // Análisis del modelo de IA
    const analysis = await inferRisk(healthData);

    // Generar recomendaciones personalizadas
    const recommendations = `Based on the analysis:
      - Risk Level: ${analysis.riskLevel}.
      - Recommendations: ${
        analysis.details || "Consult your doctor for further guidance."
      }`;

    res.status(200).json({ recommendations });
  } catch (error) {
    console.error("Error in Chat Medical:", error.message);
    res
      .status(500)
      .json({ message: "Unable to provide recommendations at the moment." });
  }
};

module.exports = { getMedicalChatResponse };
