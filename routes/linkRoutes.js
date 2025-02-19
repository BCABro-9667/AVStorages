const express = require("express");
const Link = require("../models/Link");
const router = express.Router();

// Get all links for a user
router.get("/:userId", async (req, res) => {
  try {
    const links = await Link.find({ userId: req.params.userId });
    res.json(links);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new link
router.post("/", async (req, res) => {
  const { userId, title, url } = req.body;
  const link = new Link({ userId, title, url });
  try {
    const newLink = await link.save();
    res.status(201).json(newLink);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a link
router.delete("/:id", async (req, res) => {
  try {
    await Link.findByIdAndDelete(req.params.id);
    res.json({ message: "Link deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;