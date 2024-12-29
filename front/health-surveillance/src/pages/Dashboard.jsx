import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import LogoutButton from "../components/LogoutButton";
import '../styles/Dashboard.css';
// import Spinner from "../components/Spinner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [healthData, setHealthData] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      fetchHealthData(userData.id);
    }
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

          <h3>Your Health Data</h3>
          {healthData.length > 0 ? (
            <ul className="health-data-list">
              {healthData.map((data) => (
                <li key={data._id}>
                  <p><strong>Heart Rate:</strong> {data.heartRate} bpm</p>
                  <p><strong>Blood Pressure:</strong> {data.bloodPressure}</p>
                  <p><strong>Oxygen Level:</strong> {data.oxygenLevel}%</p>
                  <p><strong>Date:</strong> {new Date(data.createdAt).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No health data available</p>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
