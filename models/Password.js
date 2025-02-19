// Updated Password.js (No Hashing)
const mongoose = require("mongoose");

const PasswordSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  websiteLink: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }, // ✅ Store in plain text
});

module.exports = mongoose.model("Password", PasswordSchema);