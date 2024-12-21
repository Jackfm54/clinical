const User = require("../models/user");

// Ajouter un nouvel utilisateur
const addUser = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.error("Error adding user:", error.message);
    throw new Error("Failed to add user.");
  }
};

// Récupérer un utilisateur par son ID
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found.");
    }
    return user;
  } catch (error) {
    console.error("Error fetching user:", error.message);
    throw new Error("Failed to fetch user.");
  }
};

// Mettre à jour un utilisateur
const updateUser = async (userId, updateData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("User not found.");
    }
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw new Error("Failed to update user.");
  }
};

// Supprimer un utilisateur
const deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error("User not found.");
    }
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error.message);
    throw new Error("Failed to delete user.");
  }
};

module.exports = {
  addUser,
  getUserById,
  updateUser,
  deleteUser,
};
