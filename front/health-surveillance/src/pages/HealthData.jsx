import React, { useState, useEffect } from "react";
import { saveHealthData, fetchUsers } from "../services/api";
import "../styles/HealthData.css";

const HealthData = () => {
  const [healthData, setHealthData] = useState({
    userId: "",
    heartRate: "",
    bloodPressure: "",
    oxygenLevel: "",
  });
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
        setFilteredUsers(users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    loadUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHealthData({ ...healthData, [name]: value });
  };

  const handleSearch = () => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveHealthData(healthData);
      setSuccessMessage("Health data saved successfully!");
      setErrorMessage("");
      setHealthData({ userId: "", heartRate: "", bloodPressure: "", oxygenLevel: "" });
    } catch (error) {
      setErrorMessage("Failed to save health data.");
    }
  };

  return (
    <div className="health-data">
      <h2>Submit Health Data</h2>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input
          type="text"
          name="userId"
          value={healthData.userId}
          onChange={handleChange}
          required
        />

        <label>Heart Rate:</label>
        <input
          type="number"
          name="heartRate"
          value={healthData.heartRate}
          onChange={handleChange}
          required
        />

        <label>Blood Pressure:</label>
        <input
          type="text"
          name="bloodPressure"
          value={healthData.bloodPressure}
          onChange={handleChange}
          required
        />

        <label>Oxygen Level:</label>
        <input
          type="number"
          name="oxygenLevel"
          value={healthData.oxygenLevel}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <h3>Users</h3>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <ul className="user-list">
        {filteredUsers.map((user) => (
          <li key={user._id} onClick={() => setHealthData({ ...healthData, userId: user._id })}>
            <strong>ID:</strong> {user._id} - <strong>Name:</strong> {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthData;
