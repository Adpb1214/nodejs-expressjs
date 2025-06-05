const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());

const USERS_FILE = "users.json";
const jwt = require("jsonwebtoken");
const SECRET_KEY = "a1b2c3d4e5f6@Ad"; // in .env ideally

// In your login route after successful password match:

// Utility to read/write from file
const loadUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
};

const saveUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

app.get("/", (req, res) => {
  res.send("👋 Hello, the server is working! Use /register or /login");
});

// Register
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();

  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  saveUsers(users);

  res.status(201).json({ message: "User registered" });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });

res.json({ message: "Login successful", token });

});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
