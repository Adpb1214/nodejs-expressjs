const express = require("express");
const fs = require("fs");
const router = express.Router();
const bcrypt = require("bcryptjs");
const USERS_FILE = "users.json";
const jwt = require("jsonwebtoken");
const SECRET_KEY = "a1b2c3d4e5f6@Ad";

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("All fields are required");
  }
  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
  const existinguser = users.find((user) => {
    return user.email === email;
  });
  if (existinguser) {
    return res.status(400).send("USER ALREADY EXISTS");
  }
  const hashedpass = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now(),
    username,
    password: hashedpass,
    email,
  };
  users.push(newUser)
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.status(201).send("User registered successfully");
});



router.post("/signin", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));

  const user = users.find(
    (u) => u.email === email && u.username === username
  );

  if (!user) {
    return res.status(401).send("Invalid credentials (user not found)");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).send("Invalid credentials (wrong password)");
  }

  // 🧾 Create JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    SECRET_KEY,
    { expiresIn: "1h" } // optional: expires in 1 hour
  );

  res.status(200).json({
    message: "Login successful",
    token,
  });
});

  

module.exports = router;
