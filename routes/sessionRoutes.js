const express = require("express");
const router = express.Router();
const Session = require("../models/Session");
const authMiddleware = require("../middleware/authMiddleware");

// Create Session (Save Performance)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { exercise, repetitions, accuracy, duration } = req.body;

    const session = new Session({
      user: req.user.id,
      exercise,
      repetitions,
      accuracy,
      duration
    });

    await session.save();

    res.status(201).json(session);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get User Sessions
router.get("/", authMiddleware, async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id })
      .populate("exercise");

    res.json(sessions);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
