const authMiddleware = require("../middleware/authMiddleware");

const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise");

// Add Exercise
router.post("/",authMiddleware, async (req, res) => {
  try {
    const exercise = new Exercise(req.body);
    await exercise.save();
    res.status(201).json(exercise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Exercises
router.get("/", authMiddleware,async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
