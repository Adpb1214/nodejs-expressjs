const express = require("express");
const verifyToken = require("../middleware/middleware");
const { verifyAdmin } = require("../middleware/roleMiddleware");
const router = express.Router();

router.get("/dashboard",verifyToken,verifyAdmin, (req, res) => {
  res.send(`Welcome Admin: ${req.user.username} to dashboard page`);
});
router.get("/settings",verifyToken, (req, res) => {
  res.send(`Welcome Admin: ${req.user.username} to settings page`);
});

router.delete("/user/:id", (req, res) => {
  res.send(`User with ID ${req.params.id} deleted.`);
});

module.exports = router;
