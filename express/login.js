const http = require("http");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { URL } = require("url");

const USERS_FILE = "users.json";
const SECRET_KEY = "a1b2c3d4e5f6@Ad";

// Load & Save Users
const loadUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE));
};

const saveUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Helper: parse body from request
const getRequestBody = (req) => {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(JSON.parse(body)));
  });
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // Set CORS and headers
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200);
    res.end(JSON.stringify({ message: "👋 Server is running!" }));
  }

  // Register
  else if (req.method === "POST" && url.pathname === "/register") {
    const { email, password } = await getRequestBody(req);
    const users = loadUsers();

    if (users.find((u) => u.email === email)) {
      res.writeHead(409);
      return res.end(JSON.stringify({ message: "User already exists" }));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    saveUsers(users);
    
    res.writeHead(201);
    res.end(JSON.stringify({ message: "User registered" }));
  }

  // Login
  else if (req.method === "POST" && url.pathname === "/login") {
    const { email, password } = await getRequestBody(req);
    const users = loadUsers();

    const user = users.find((u) => u.email === email);
    if (!user) {
      res.writeHead(400);
      return res.end(JSON.stringify({ message: "Invalid credentials" }));
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.writeHead(400);
      return res.end(JSON.stringify({ message: "Invalid credentials" }));
    }
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    res.writeHead(200);
    res.end(JSON.stringify({ message: "Login successful", token }));
  }

  // Fallback for unknown routes
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
