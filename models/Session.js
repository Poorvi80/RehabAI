const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
    required: true
  },
  repetitions: Number,
  accuracy: Number,
  duration: Number
}, { timestamps: true });

module.exports = mongoose.model("Session", sessionSchema);
