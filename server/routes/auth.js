const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🔐 User Registration
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ error: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.json({ message: "User registered", user: newUser });
});

// 🔑 Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // ✅ Send full user info including name
    res.json({
      user: {
        id: user._id,
        name: user.name,       // <-- This ensures Dashboard shows it
        email: user.email,
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// ⭐ Get Spark Points for user
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("sparkPoints");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ REQUIRED EXPORT
module.exports = router;
