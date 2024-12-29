const { inferRisk } = require("../services/aiServices");

const classifyHealthRisk = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { heartRate, bloodPressure, oxygenLevel } = req.body;

    if (!heartRate || !bloodPressure || !oxygenLevel) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const riskAnalysis = await inferRisk({
      heartRate,
      bloodPressure,
      oxygenLevel,
    });

    console.log("Risk Analysis Response:", riskAnalysis);

    res.json({ success: true, risk: riskAnalysis });
  } catch (error) {
    console.error("Error in classifyHealthRisk:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { classifyHealthRisk };
