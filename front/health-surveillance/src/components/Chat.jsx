import React, { useState } from "react";
import { api } from "../services/api"; // Asegúrate de que este archivo esté configurado

const Chat = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Construir healthData basado en la entrada del usuario
    const healthData = {
      heartRate: 75, // Aquí puedes usar valores fijos o datos del estado
      bloodPressure: "120/80",
      oxygenLevel: 98,
    };
  
    try {
      const res = await api.post("/chat", { healthData });
      setResponse(res.data.reply);
    } catch (error) {
      console.error("Error fetching chat response:", error.response?.data || error.message);
      setResponse(error.response?.data.message || "Unable to get a response from the server.");
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div>
      <h2>Medical Chat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Send"}
        </button>
      </form>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default Chat;
