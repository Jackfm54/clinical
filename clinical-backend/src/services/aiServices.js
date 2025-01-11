const axios = require("axios");

/**
 * Ejecuta el modelo Ollama localmente a través de una API HTTP y devuelve la respuesta.
 * @param {Object} options - Configuración del modelo.
 * @param {string} options.prompt - Texto del prompt a enviar al modelo.
 * @param {string} [options.model="ALIENTELLIGENCE/medicaldiagnostictools"] - Modelo a ejecutar.
 * @returns {Promise<string>} - Respuesta del modelo.
 */
const inferRisk = async ({ prompt, model = "ALIENTELLIGENCE/medicaldiagnostictools" }) => {
  const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";

  try {
    console.log("Executing model:", model);
    console.log("Prompt being sent:", prompt);

    const response = await axios.post(`${OLLAMA_URL}/api/chat`, {
      model,
      messages: [{ role: "user", content: prompt }],
    });

    console.log("Model Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error executing model:", error.message);
    throw new Error("AI model execution failed.");
  }
};

const regression = (healthData) => {
  const heartRates = healthData.map((d) => d.heartRate);
  const avgHeartRate = heartRates.reduce((a, b) => a + b, 0) / heartRates.length;

  const oxygenLevels = healthData.map((d) => d.oxygenLevel);
  const avgOxygenLevel = oxygenLevels.reduce((a, b) => a + b, 0) / oxygenLevels.length;

  return {
    nextHeartRate: avgHeartRate,
    nextOxygenLevel: avgOxygenLevel,
  };
};

const classifyRisk = (data) => {
  if (data.heartRate > 120 || data.bloodPressure.includes("140/100")) {
    return "High Risk";
  } else if (data.heartRate > 90 || data.oxygenLevel < 92) {
    return "Moderate Risk";
  } else {
    return "Low Risk";
  }
};

module.exports = { inferRisk, regression, classifyRisk };
