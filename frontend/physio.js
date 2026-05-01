const express = require("express");
const router = express.Router();

// ✅ MATCHING YOUR FRONTEND STRUCTURE
const doctors = [
  {
    name: "Dr. Riya Sharma",
    spec: "Knee Rehabilitation",
    exp: 5,
    location: "Delhi",
    rating: 4.5
  },
  {
    name: "Dr. Aman Verma",
    spec: "Shoulder Therapy",
    exp: 7,
    location: "Mumbai",
    rating: 4.7
  },
  {
    name: "Dr. Neha Gupta",
    spec: "Sports Injury Rehab",
    exp: 6,
    location: "Bangalore",
    rating: 4.6
  },
  {
    name: "Dr. Rahul Mehta",
    spec: "Post Surgery Rehab",
    exp: 8,
    location: "Pune",
    rating: 4.8
  }
];

// GET ALL DOCTORS
router.get("/", (req, res) => {
  res.json(doctors);
});

module.exports = router;