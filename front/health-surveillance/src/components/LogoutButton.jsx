import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} style={{ marginTop: "20px", padding: "10px 20px" }}>
      Logout
    </button>
  );
};

export default LogoutButton;
