import React, { useState } from "react";
import { api } from "../services/api"; // Archivo de configuración Axios
import "../styles/Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]); // Historial de mensajes
  const [input, setInput] = useState(""); // Entrada del usuario
  const [loading, setLoading] = useState(false); // Indicador de carga

  const sendMessage = async () => {
    if (!input.trim()) return; // Evitar mensajes vacíos

    // Agregar el mensaje del usuario al historial
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput(""); // Limpiar el campo de entrada
    setLoading(true);

    try {
      // Solicitud al backend
      const response = await api.post("/chat", {
        healthData: parseInput(input), // Convierte la entrada a datos esperados
      });

      // Agregar la respuesta de la IA al historial
      setMessages([
        ...newMessages,
        { sender: "ai", text: response.data.recommendations },
      ]);
    } catch (error) {
      // Manejar errores
      setMessages([
        ...newMessages,
        { sender: "ai", text: "Unable to provide recommendations at the moment." },
      ]);
    } finally {
      setLoading(false); // Ocultar indicador de carga
    }
  };

  const parseInput = (input) => {
    // Aquí puedes convertir el texto a datos estructurados, por ejemplo:
    return {
      heartRate: 110,
      bloodPressure: "140/90",
      oxygenLevel: 95,
    };
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === "user" ? "user" : "ai"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      {loading && <div className="chat-loading">Processing...</div>}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Enter your question or health data..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
