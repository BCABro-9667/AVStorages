const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Store the image URL
});

module.exports = mongoose.model("Gallery", GallerySchema);