const { inferRisk } = require("./aiServices"); // Ruta relativa desde `services/`
const fs = require("fs");

const evaluateModel = async (testData) => {
  let correctPredictions = 0;

  for (const data of testData) {
    try {
      const prediction = await inferRisk(data);
      console.log("Prediction:", prediction);

      if (prediction.riskLevel === data.expectedRiskLevel) {
        correctPredictions++;
      }
    } catch (error) {
      console.error("Error during evaluation:", error.message);
    }
  }

  const accuracy = (correctPredictions / testData.length) * 100;
  console.log(`Model Accuracy: ${accuracy}%`);
};

const datasetPath =
  "C:/Users/jackf/Desktop/hopitalIA/clinical-backend/src/datasets/healthData.json"; // Ruta relativa desde `services/`
const testData = JSON.parse(fs.readFileSync(datasetPath, "utf8"));
evaluateModel(testData);
