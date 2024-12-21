const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());

// Rutas existentes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/health", require("./routes/healthRoutes"));

// Nuevas rutas
app.use("/api/recommendations", require("./routes/recommendationRoutes"));
app.use("/api/social", require("./routes/socialInteractionRoutes"));

module.exports = app;
