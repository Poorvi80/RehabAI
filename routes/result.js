const express = require("express");
const router = express.Router();

// =========================
// TEMP STORAGE (NO DB)
// =========================
let results = [];

// 🔥 NEW: STREAK TRACKING
let streak = 0;
let lastActive = "";

// =========================
// POST: SAVE RESULT
// =========================
router.post("/", (req, res) => {
  const { reps, accuracy } = req.body;

  // Save result
  const newResult = {
    reps,
    accuracy,
    date: new Date().toISOString(),
  };

  results.push(newResult);

  // =========================
  // 🔥 STREAK LOGIC
  // =========================
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (lastActive === yesterday) {
    streak += 1;
  } else if (lastActive !== today) {
    streak = 1;
  }

  lastActive = today;

  // =========================
  // RESPONSE
  // =========================
  res.json({
    message: "Result saved",
    streak: streak,
  });
});

// =========================
// GET: FETCH DATA
// =========================
router.get("/", (req, res) => {
  res.json({
    results: results,
    streak: streak,
  });
});

module.exports = router;