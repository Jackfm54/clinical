const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const healthRoutes = require("./routes/healthRoutes");

connectDB();

const app = express();
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/health", healthRoutes);

module.exports = app;
