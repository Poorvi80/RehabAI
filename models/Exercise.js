const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  targetArea: String,
  difficulty: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner"
  }
}, { timestamps: true });

module.exports = mongoose.model("Exercise", exerciseSchema);
