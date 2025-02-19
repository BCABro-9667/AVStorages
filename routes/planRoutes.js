const express = require("express");
const Plan = require("../models/Plan");
const router = express.Router();

// Get all plans for a user
router.get("/:userId", async (req, res) => {
  try {
    const plans = await Plan.find({ userId: req.params.userId });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new plan
router.post("/", async (req, res) => {
  const { userId, title, description } = req.body;
  const plan = new Plan({ userId, title, description });
  try {
    const newPlan = await plan.save();
    res.status(201).json(newPlan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a plan
router.delete("/:id", async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: "Plan deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;