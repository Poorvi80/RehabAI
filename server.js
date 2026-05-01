const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

// ==========================
// IMPORT ROUTES
// ==========================
const exerciseRoutes = require("./routes/exerciseRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const physioRoutes = require("./routes/physioRoutes");
const resultRoutes = require("./routes/result");

// ==========================
// INIT APP
// ==========================
const app = express();

// ==========================
// MIDDLEWARE
// ==========================
app.use(cors());
app.use(express.json());

// ==========================
// 🔥 SERVE FRONTEND (FIXED)
// ==========================
app.use(express.static(path.join(__dirname, "frontend")));

// ==========================
// API ROUTES
// ==========================
app.use("/api/exercises", exerciseRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/physio", physioRoutes);
app.use("/api/results", resultRoutes);

// ==========================
// ROOT ROUTE (FIXED)
// ==========================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// ==========================
// MONGODB CONNECTION
// ==========================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err.message));

// ==========================
// SERVER START
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});