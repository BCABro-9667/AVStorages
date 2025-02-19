const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cardHolderName: { type: String, required: true },
  cardNumber: { type: String, required: true }, // ✅ Store in plain text
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true }, // ✅ Store in plain text
  cardPin: { type: String, required: true }, // ✅ Store in plain text
  cardType: { type: String, required: true },
});

module.exports = mongoose.model("Card", CardSchema);
