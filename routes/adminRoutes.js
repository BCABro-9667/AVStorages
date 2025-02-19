const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Admin Login Route
router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Access Denied: You are not an Admin" });
    }

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, userId: user.id, username: user.username });
  } catch (err) {
    console.error("Admin Login Error:", err.message);
    res.status(500).send("Server error");
  }
});

// ✅ Get All Users (Admin Only)
router.get("/users", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access Denied: Not an Admin" });
    }

    const users = await User.find({}, "-password"); // Exclude passwords
    res.json(users);
  } catch (err) {
    console.error("Get Users Error:", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// ✅ Delete User (Admin Only)
router.delete("/users/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access Denied: Not an Admin" });
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User Deleted Successfully" });
  } catch (err) {
    console.error("Delete User Error:", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
