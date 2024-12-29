import React, { useState } from "react";
import { saveHealthData } from "../services/api";

const HealthData = () => {
  const [healthData, setHealthData] = useState({
    userId: "",
    heartRate: "",
    bloodPressure: "",
    oxygenLevel: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHealthData({ ...healthData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveHealthData(healthData);
      setSuccessMessage("Health data saved successfully!");
      setErrorMessage("");
      setHealthData({ userId: "", heartRate: "", bloodPressure: "", oxygenLevel: "" });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to save health data.");
    }
  };

  return (
    <div className="health-data">
      <h2>Submit Health Data</h2>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input type="text" name="userId" value={healthData.userId} onChange={handleChange} required />

        <label>Heart Rate:</label>
        <input type="number" name="heartRate" value={healthData.heartRate} onChange={handleChange} required />

        <label>Blood Pressure:</label>
        <input type="text" name="bloodPressure" value={healthData.bloodPressure} onChange={handleChange} required />

        <label>Oxygen Level:</label>
        <input type="number" name="oxygenLevel" value={healthData.oxygenLevel} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default HealthData;
