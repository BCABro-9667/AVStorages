const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Gallery = require("../models/Gallery");
const router = express.Router();

// ✅ Serve uploaded images correctly
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

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

// ✅ Upload a New Image
router.post("/", upload.single("image"), async (req, res) => {
  const { userId, title } = req.body;
  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  // ✅ Store full image URL instead of relative path
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  try {
    const image = new Gallery({ userId, title, imageUrl });
    const newImage = await image.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all images for a user
router.get("/:userId", async (req, res) => {
  try {
    const images = await Gallery.find({ userId: req.params.userId });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
