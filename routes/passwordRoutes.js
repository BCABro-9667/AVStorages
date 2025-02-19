


// Updated passwordRoutes.js (Return Real Passwords)
const express = require("express");
const Password = require("../models/Password");
const router = express.Router();

// ✅ GET all passwords for a user
router.get("/:userId", async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.params.userId });
    res.json(passwords); // ✅ Return real passwords
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST a new password (Store in plain text)
router.post("/", async (req, res) => {
  try {
    const { userId, websiteLink, username, password } = req.body;

    if (!userId || !websiteLink || !username || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newPassword = new Password({ userId, websiteLink, username, password });
    const savedPassword = await newPassword.save();

    res.status(201).json(savedPassword);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE password by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPassword = await Password.findByIdAndDelete(req.params.id);
    if (!deletedPassword) {
      return res.status(404).json({ message: "Password not found!" });
    }
    res.json({ message: "Password deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;