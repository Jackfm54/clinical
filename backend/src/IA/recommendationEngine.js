const { queryOllama } = require("./ollamaClient");
const Recommendation = require("../models/recommendation");

// Fonction pour générer des recommandations
const generateRecommendations = async (userId, preferences) => {
  try {
    // Préparer l'entrée pour le modèle Ollama
    const input = `Generate personalized recommendations based on these preferences: ${JSON.stringify(
      preferences
    )}`;

    // Appel au modèle Ollama
    const response = await queryOllama(input);

    if (!response || !response.recommendations) {
      throw new Error("No recommendations returned from the model.");
    }

    // Sauvegarder les recommandations dans la base de données
    const recommendationData = {
      userId,
      recommendations: response.recommendations.map((item) => ({
        title: item.title || "Untitled",
        description: item.description || "",
        link: item.link || "",
      })),
    };

    const recommendation = await Recommendation.create(recommendationData);

    return recommendation;
  } catch (error) {
    console.error("Error in recommendation engine:", error.message);
    throw new Error("Failed to generate recommendations.");
  }
};

module.exports = { generateRecommendations };
