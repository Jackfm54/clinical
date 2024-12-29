import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response?.data || error.message);
    throw error;
  }
};

export const saveHealthData = async (healthData) => {
  try {
    const response = await api.post("/health-data", healthData);
    return response.data;
  } catch (error) {
    console.error("Error saving health data:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchHealthDataByUser = async (userId) => {
  try {
    const response = await api.get(`/health-data/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching health data:", error.response?.data || error.message);
    throw error;
  }
};
