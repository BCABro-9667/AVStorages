// todoRoutes.js
const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

// Get all todos for a user
router.get("/:userId", async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.params.userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new todo
router.post("/", async (req, res) => {
  const { userId, text } = req.body;
  const todo = new Todo({ userId, text });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a todo
router.patch("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Toggle completion status of a todo
router.patch("/:id/toggle", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: !todo.completed },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;