const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Todo = require("../models/Todo");

// Protected route example
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;