import React, { useState } from "react";
import { api } from "../services/api";
import "../styles/ChatMedical.css";

const ChatMedical = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse("");

    try {
      const res = await api.post("/chat", { question });
      setResponse(res.data.recommendations);
    } catch (err) {
      console.error("Error fetching response:", err);
      setError("Unable to fetch recommendations at this time.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your medical question..."
          required
        />
        <button type="submit">Send</button>
      </form>
      {response && <p>Response: {response}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ChatMedical;
