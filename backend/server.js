// server.js
const express = require("express");
const app=express();
app.use(express.json());

app.use(express.json()); // JSON body parse karne ke liye
const jwt = require("jsonwebtoken");
const SECRET_KEY = "super-secret-key";
// --- Login route ---
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
    console.log("Received from frontend:", email, password);
  // Dummy authentication check
  if (email === "test@example.com" && password === "123456") {
     const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
     console.log(token)
    return res.json({ token, user: { id: 1, name: "Test User", email } });
  } 
    res.status(401).json({ error: "Invalid credentials" });
  
});

// --- User info route ---
app.get("/api/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    res.json({ user: { id: 1, name: "Test User", email: decoded.email } });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
