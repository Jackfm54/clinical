const express = require("express");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const healthDataRoutes = require("./routes/healthDataRoutes");
const aiRoutes = require("./routes/aiRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { initSocket } = require("./services/socketService");

// Inicialización de la aplicación
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Analiza JSON en las solicitudes

// Conexión a la base de datos
connectDB();

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/health-data", healthDataRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chat", chatRoutes); // Ruta para chat médico

// Crear un servidor HTTP para socket.io
const server = http.createServer(app);
initSocket(server); // Inicializar sockets

// Configuración del servidor
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
