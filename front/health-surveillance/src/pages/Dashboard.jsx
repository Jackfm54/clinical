import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import LogoutButton from "../components/LogoutButton";
import HealthChart from "../components/HealthChart";
import "../styles/Dashboard.css";
import io from "socket.io-client";
import MedicalChat from "../components/MedicalChat";

// Socket io
const socket = io("http://localhost:5001");

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [healthData, setHealthData] = useState([]);
  const [predictions, setPredictions] = useState(null); // Para guardar predicciones
  const [notifications, setNotifications] = useState([]);
  const [newHealthData, setNewHealthData] = useState({
    heartRate: "",
    bloodPressure: "",
    oxygenLevel: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = healthData.slice(indexOfFirstItem, indexOfLastItem);

  // Buttons pagination
  const nextPage = () => {
    if (currentPage < Math.ceil(healthData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const averages = {
    averageHeartRate: 80,
    averageBloodPressure: "120/80",
    averageOxygenLevel: 98,
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      fetchHealthData(userData.id);
    }

    socket.on("notification", (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.off("notification");
    };
  }, [navigate]);

  const fetchHealthData = async (userId) => {
    try {
      const response = await api.get(`/health-data/${userId}`);
      setHealthData(response.data);

      // Solicitar predicciones al backend
      const predictionResponse = await api.post("/ai/predict", {
        healthData: response.data,
      });
      setPredictions(predictionResponse.data); // Guardar predicciones
    } catch (error) {
      console.error("Failed to fetch health data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHealthData({ ...newHealthData, [name]: value });
  };

  const handleSubmitHealthData = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/health-data", {
        ...newHealthData,
        userId: user.id,
      });
      setHealthData((prev) => [...prev, response.data.healthData]);
      setNewHealthData({ heartRate: "", bloodPressure: "", oxygenLevel: "" });
      alert("Health data saved successfully!");
    } catch (error) {
      console.error("Failed to save health data:", error);
      alert("Failed to save health data. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      {user ? (
        <>
          <h2>Welcome, {user.name}!</h2>
          <p>Your email: {user.email}</p>
          <LogoutButton />

          <h3>Register Your Health Data</h3>
          <form onSubmit={handleSubmitHealthData} className="health-data-form">
            <label>
              Heart Rate (bpm):
              <input
                type="number"
                name="heartRate"
                value={newHealthData.heartRate}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Blood Pressure (e.g., 120/80):
              <input
                type="text"
                name="bloodPressure"
                value={newHealthData.bloodPressure}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Oxygen Level (%):
              <input
                type="number"
                name="oxygenLevel"
                value={newHealthData.oxygenLevel}
                onChange={handleInputChange}
                required
              />
            </label>
            <button type="submit">Save Data</button>
          </form>

          {/* Mostrar historial de datos de salud */}
          <h3>Your Health Data History</h3>
          {healthData.length > 0 ? (
            <>
              <ul className="health-data-list">
                {currentItems.map((data) => (
                  <li key={data._id}>
                    <p>
                      <strong>Heart Rate:</strong> {data.heartRate} bpm
                    </p>
                    <p>
                      <strong>Blood Pressure:</strong> {data.bloodPressure}
                    </p>
                    <p>
                      <strong>Oxygen Level:</strong> {data.oxygenLevel}%
                    </p>
                    <p>
                      <strong>Date:</strong> {new Date(data.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Paginador */}
              <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                  Previous
                </button>
                <span>
                  Page {currentPage} of {Math.ceil(healthData.length / itemsPerPage)}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === Math.ceil(healthData.length / itemsPerPage)}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p>No health data available</p>
          )}

          {/* Mostrar predicciones */}
          <h3>Predictions</h3>
          {predictions ? (
            <div className="predictions">
              <p>
                <strong>Next Heart Rate:</strong> {predictions.regression.nextHeartRate} bpm
              </p>
              <p>
                <strong>Next Oxygen Level:</strong> {predictions.regression.nextOxygenLevel}%
              </p>
              <p>
                <strong>Risk Level:</strong> {predictions.classification}
              </p>
            </div>
          ) : (
            <p>Loading predictions...</p>
          )}

          {/* Integrar Grafico Médico */}
          {healthData.length > 0 ? (
            <HealthChart healthData={healthData} averages={averages} />
          ) : (
            <p>Loading health data...</p>
          )}

          {/* Integrar Chat Médico */}
          <h3>ChatBot</h3>
          <MedicalChat />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
