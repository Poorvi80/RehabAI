const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

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