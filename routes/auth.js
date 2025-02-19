const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables


// ✅ Register Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword); // Add this line
    user = new User({ username, email, password: hashedPassword });

    // Save user to database
    await user.save();

    // Generate JWT token
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token, userId: user.id });
    });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request:", { email, password }); // Add this line
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch); // Add this line
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      console.log("Generated token:", token); // Add this line
      res.json({ token, userId: user.id });
    });

  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
