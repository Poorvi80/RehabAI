const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctors");
// Dummy physiotherapist data
const physios = [
  {
    name: "Dr. Riya Sharma",
    specialization: "Knee Rehab",
    location: "Delhi",
    experience: 5
  },
  {
    name: "Dr. Aman Verma",
    specialization: "Shoulder Therapy",
    location: "Mumbai",
    experience: 7
  },
  {
    name: "Dr. Neha Gupta",
    specialization: "Sports Injury",
    location: "Bangalore",
    experience: 6
  },
  {
    name: "Dr. Rahul Mehta",
    specialization: "Post Surgery Rehab",
    location: "Pune",
    experience: 8
  }
];

// 🔹 GET all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 ADD doctor (for testing / admin)
router.post("/", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;