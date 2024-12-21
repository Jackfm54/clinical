const { queryOllama } = require("../IA/ollamaClient");

// Generar recomendaciones personalizadas
const generateRecommendations = async (userPreferences) => {
  try {
    const input = `Generate personalized recommendations based on the following preferences: ${JSON.stringify(
      userPreferences
    )}`;
    const response = await queryOllama(input);
    return response.recommendations || [];
  } catch (error) {
    console.error("Error generating recommendations:", error.message);
    throw new Error("Failed to generate recommendations.");
  }
};

module.exports = { generateRecommendations };
