const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.send("Admin dashboard accessed.");
});

router.delete("/user/:id", (req, res) => {
  res.send(`User with ID ${req.params.id} deleted.`);
});

module.exports = router;
