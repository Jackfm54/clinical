import React, { useState } from "react";
import { api } from "../services/api";
import "../styles/ChatMedical.css";

const ChatMedical = () => {
  const [healthData, setHealthData] = useState({
    heartRate: "",
    bloodPressure: "",
    oxygenLevel: "",
  });
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHealthData({ ...healthData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
   try {
    console.log("Sending health data:", healthData); // Log de datos enviados
    const response = await api.post("/chat", { healthData });
    console.log("Received recommendations:", response.data); // Log de respuesta
    setRecommendations(response.data.recommendations);
  } catch (error) {
    console.error("Error fetching recommendations:", error.response?.data || error.message);
    setRecommendations("Unable to fetch recommendations at this time.");
  } finally {
    setLoading(false);
  }
  };

  return (
    <div className="chat-medical">
      <h3>Medical Chat</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Heart Rate:
          <input
            type="number"
            name="heartRate"
            value={healthData.heartRate}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Blood Pressure:
          <input
            type="text"
            name="bloodPressure"
            value={healthData.bloodPressure}
            onChange={handleInputChange}
            placeholder="e.g., 120/80"
            required
          />
        </label>
        <label>
          Oxygen Level:
          <input
            type="number"
            name="oxygenLevel"
            value={healthData.oxygenLevel}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
      </form>
      {recommendations && (
        <div className="recommendations">
          <h4>Recommendations:</h4>
          <p>{recommendations}</p>
        </div>
      )}
    </div>
  );
};

export default ChatMedical;
