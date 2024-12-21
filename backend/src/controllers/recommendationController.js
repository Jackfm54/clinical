const {
  generateRecommendations,
} = require("../services/recommendationService");

// Endpoint para obtener recomendaciones
const getRecommendations = async (req, res) => {
  const { preferences } = req.body; // Preferencias del usuario
  try {
    const recommendations = await generateRecommendations(preferences);
    res.status(200).json({ recommendations });
  } catch (error) {
    res.status(500).json({ message: "Error fetching recommendations", error });
  }
};

module.exports = { getRecommendations };
