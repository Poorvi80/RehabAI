const express = require("express");
const router = express.Router();

let results = []; // temporary (later DB)

router.post("/", (req, res) => {
  results.push(req.body);
  res.json({ message: "Result saved" });
});

router.get("/", (req, res) => {
  res.json(results);
});

module.exports = router;