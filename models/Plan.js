const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Plan", PlanSchema);