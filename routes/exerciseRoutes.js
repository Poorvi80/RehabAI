const authMiddleware = require("../middleware/authMiddleware");

const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise");

// Add Exercise
router.post("/", async (req, res) => {
  try {
    const newExercise = new Exercise(req.body);
    const saved = await newExercise.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Exercises
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
