const { inferRisk } = require("./aiServices"); // Ruta relativa desde `services/`
const fs = require("fs");

(async () => {
  const datasetPath =
    "C:/Users/jackf/Desktop/hopitalIA/clinical-backend/src/datasets/healthData.json"; // Ruta relativa desde `services/`
  const healthData = JSON.parse(fs.readFileSync(datasetPath, "utf8"));

  for (const data of healthData) {
    try {
      const result = await inferRisk(data);
      console.log("AI Response:", result);
    } catch (error) {
      console.error("Error testing AI model:", error.message);
    }
  }
})();
