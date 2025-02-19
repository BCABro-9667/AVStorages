const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // To associate todos with a user
  text: { type: String, required: true },
  isEditing: { type: Boolean, default: false },
});

module.exports = mongoose.model("Todo", TodoSchema);