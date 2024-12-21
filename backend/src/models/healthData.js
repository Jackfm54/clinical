const mongoose = require("mongoose");

const healthDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  heartRate: Number,
  bloodPressure: String,
  oxygenLevel: Number,
}, { timestamps: true });

module.exports = mongoose.model("HealthData", healthDataSchema);
