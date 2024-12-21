const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();
app.use(bodyParser.json());

// Rutas
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/health", require("./routes/healthRoutes"));

module.exports = app;
