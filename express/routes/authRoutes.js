const express = require("express");
const fs = require("fs");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const USERS_FILE = "users.json";
const SECRET_KEY = "a1b2c3d4e5f6@Ad";


// 🧠 Helper to load/save users
const loadUsers = () => JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
const saveUsers = (users) => fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

/**
 * 1️⃣ Forgot Password - generate reset token & "send" email
 */
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send("Email is required");

  const users = loadUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).send("User not found");

  const resetToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "15m" });

  // Attach token to user
  user.resetToken = resetToken;
  saveUsers(users);

  // Simulate sending email
  const resetLink = `http://localhost:3004/reset-password/${resetToken}`;
  console.log("🔗 Reset link (send via email):", resetLink);

  res.send("Reset password link sent. Check console for now.");
});

/**
 * 2️⃣ Reset Password - verify token & update password
 */
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) return res.status(400).send("New password is required");

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const users = loadUsers();
    const user = users.find((u) => u.id === decoded.id && u.resetToken === token);

    if (!user) return res.status(400).send("Invalid or expired token");

    // Hash and update password
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    delete user.resetToken;

    saveUsers(users);
    res.send("Password has been reset successfully");
  } catch (err) {
    console.error("Reset error:", err.message);
    res.status(400).send("Invalid or expired token");
  }
});

// 🚀 Register Route
router.post("/register", async (req, res) => {
  const { username, email, password, role = "user" } = req.body;
console.log(req.body,"body")
  if (!username || !email || !password || !role) {
    return res.status(400).send("All fields are required");
  }
  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
  const existingUser = users.find((user) => user.email === email);
console.log(users,"users")
  if (existingUser) {
    return res.status(400).send("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    username,
    email,
    password: hashedPassword,
    role,
  };

  users.push(newUser);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.status(201).send("User registered successfully");
});
router.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).send("No refresh token provided");

  try {
    const decoded = jwt.verify(refreshToken, SECRET_KEY);

    const newAccessToken = jwt.sign(
      { id: decoded.id, username: decoded.username, role: decoded.role },
      SECRET_KEY,
      { expiresIn: "1m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).send("Invalid refresh token");
  }
});


// 🔐 Signin Route
// 🔐 Signin Route
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

  const accessToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: "1m" }
  );

  const refreshToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    message: "Login successful",
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
});


module.exports = router;
