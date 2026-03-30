const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  spec: String,
  exp: String,
  location: String,
  rating: Number
});

module.exports = mongoose.model("Doctor", doctorSchema);