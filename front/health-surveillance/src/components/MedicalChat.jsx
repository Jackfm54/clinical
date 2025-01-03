import React, { useState } from "react";
import { api } from "../services/api";
import "../styles/ChatMedical.css";

const ChatMedical = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const newMessage = { sender: "user", text: question };
    setConversation((prev) => [...prev, newMessage]);

    try {
      const res = await api.post("/chat", { question });
      const botResponse = res.data.recommendations;

      const botMessage = { sender: "bot", text: botResponse };
      setConversation((prev) => [...prev, botMessage]);

      setResponse(botResponse);
    } catch (err) {
      console.error("Error fetching response:", err);
      setError("Unable to fetch recommendations at this time.");
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  return (
    <div className="chat-medical">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your medical question..."
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="conversation-box">
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
          >
            <img
              src={msg.sender === "user" ? "/images/user-icon.png" : "/images/bot-icon.png"}
              alt={msg.sender === "user" ? "User" : "Bot"}
              className="message-icon"
            />
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMedical;
