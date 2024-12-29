const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const healthDataRoutes = require("./routes/healthDataRoutes");
const chatRoutes = require("./routes/chatRoutes");
const aiRoutes = require("./routes/aiRoutes");
const { initSocket } = require("./services/socketService");

// Initialisation
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à la base de données
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/health-data", healthDataRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chat", chatRoutes);

// Créer un serveur HTTP pour socket.io
const server = http.createServer(app);
initSocket(server);

// Serveur
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
