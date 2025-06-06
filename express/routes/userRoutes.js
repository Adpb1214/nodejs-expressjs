const express = require("express");
const router = express.Router();

router.get("/profile", (req, res) => {
  res.send("Welcome to your user profile.");
});

router.post("/update", (req, res) => {
  const { name, email } = req.body;
  res.send(`Updated user: ${name}, ${email}`);
});

module.exports = router;
