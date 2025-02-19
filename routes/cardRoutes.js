// Updated cardRoutes.js
const express = require("express");
const Card = require("../models/Card");
const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.params.userId });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCard = new Card(req.body);
    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;