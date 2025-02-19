const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model("Link", LinkSchema);