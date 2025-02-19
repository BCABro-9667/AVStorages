const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Gallery = require("../models/Gallery");
const router = express.Router();

// Ensure 'uploads/' folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Serve Uploaded Images
router.use("/uploads", express.static(uploadDir));

// ✅ Upload a New Image
router.post("/", upload.single("image"), async (req, res) => {
  const { userId, title } = req.body;
  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const imageUrl = `/uploads/${req.file.filename}`; // Store relative path

  try {
    const image = new Gallery({ userId, title, imageUrl });
    const newImage = await image.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
