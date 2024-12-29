import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import LogoutButton from "../components/LogoutButton";
import "../styles/Dashboard.css";
import io from "socket.io-client";
import MedicalChat from "../components/MedicalChat";

// Configuración de socket.io
const socket = io("http://localhost:5001");

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [healthData, setHealthData] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Verificar si el usuario está logueado
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      fetchHealthData(userData.id);
    }

    // Configurar socket.io para escuchar notificaciones
    socket.on("notification", (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    // Limpiar listeners de socket.io al desmontar el componente
    return () => {
      socket.off("notification");
    };
  }, [navigate]);

  const fetchHealthData = async (userId) => {
    try {
      const response = await api.get(`/health-data/${userId}`);
      setHealthData(response.data);
    } catch (error) {
      console.error("Failed to fetch health data:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {user ? (
        <>
          <h2>Welcome, {user.name}!</h2>
          <p>Your email: {user.email}</p>
          <LogoutButton />

          {/* Mostrar datos de salud */}
          <h3>Your Health Data</h3>
          {healthData.length > 0 ? (
            <ul className="health-data-list">
              {healthData.map((data) => (
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
                    <strong>Date:</strong>{" "}
                    {new Date(data.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No health data available</p>
          )}

          {/* Mostrar notificaciones en tiempo real */}
          <h3>Notifications</h3>
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notif, index) => (
                <li key={index}>{notif.message}</li>
              ))}
            </ul>
          ) : (
            <p>No notifications available</p>
          )}

          {/* Integrar Chat Médico */}
          <MedicalChat />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
