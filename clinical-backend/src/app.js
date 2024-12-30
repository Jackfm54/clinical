const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http"); // Importar para crear el servidor HTTP
const { Server } = require("socket.io"); // Importar para integrar Socket.IO
require("dotenv").config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const healthDataRoutes = require("./routes/healthDataRoutes");
const aiRoutes = require("./routes/aiRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { initSocket } = require("./services/socketService");

// Conectar a la base de datos
connectDB();

// Inicializar la aplicación Express
const app = express();

// Configuración de middlewares
app.use(cors());
app.use(bodyParser.json());

// Registrar rutas
app.use("/api/users", userRoutes);
app.use("/api/health-data", healthDataRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/ai", aiRoutes);

// Crear servidor HTTP
const server = http.createServer(app);

// Configurar e inicializar Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Cambiar si el frontend está en otro dominio o puerto
    methods: ["GET", "POST"],
  },
});

// Inicializar eventos de Socket.IO
initSocket(io);

// Configurar el puerto del servidor
const PORT = process.env.PORT || 5001;

// Iniciar el servidor HTTP
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
