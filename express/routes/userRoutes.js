const express = require("express");
const verifyToken = require("../middleware/middleware");
const { verifyUser } = require("../middleware/roleMiddleware");
const router = express.Router();

router.get("/profile",verifyToken,verifyUser, (req, res) => {
  res.send(`Welcome user: ${req.user.username} to dashboard page`);
});

router.post("/update", (req, res) => {
  const { name, email } = req.body;
  res.send(`Updated user: ${name}, ${email}`);
});

module.exports = router;
