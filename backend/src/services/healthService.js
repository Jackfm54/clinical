const HealthData = require("../models/healthData");

// Ajouter des données de santé
const addHealthData = async (userId, healthData) => {
  try {
    const newHealthData = await HealthData.create({
      userId,
      ...healthData,
    });
    return newHealthData;
  } catch (error) {
    console.error("Error adding health data:", error.message);
    throw new Error("Failed to add health data.");
  }
};

// Récupérer toutes les données de santé d'un utilisateur
const getHealthDataByUser = async (userId) => {
  try {
    const healthData = await HealthData.find({ userId }).sort({
      createdAt: -1,
    });
    return healthData;
  } catch (error) {
    console.error("Error fetching health data:", error.message);
    throw new Error("Failed to fetch health data.");
  }
};

// Supprimer une entrée de santé spécifique
const deleteHealthData = async (healthDataId) => {
  try {
    const deletedHealthData = await HealthData.findByIdAndDelete(healthDataId);
    if (!deletedHealthData) {
      throw new Error("Health data not found.");
    }
    return deletedHealthData;
  } catch (error) {
    console.error("Error deleting health data:", error.message);
    throw new Error("Failed to delete health data.");
  }
};

module.exports = {
  addHealthData,
  getHealthDataByUser,
  deleteHealthData,
};
