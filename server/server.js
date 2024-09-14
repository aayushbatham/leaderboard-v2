require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const authRoutes = require("./routes/auth");
require("./passport"); // Load passport setup
require("./db/db");

const app = express();

// CORS should allow credentials to be sent
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend origin
    credentials: true,
  })
);

// Express session middleware must be initialized before the routes
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      sameSite: "lax", // or 'none' if cross-site cookies are needed
    },
  })
);

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// Routes for authentication
app.use("/auth", authRoutes);

// Backend route to return session data
app.get("/api/session", (req, res) => {
  if (req.isAuthenticated() && req.user) {
    // Send user data from session if logged in
    return res.json({
      user: {
        username: req.user.username,
        avatar: req.user.avatar, // Include avatar URL
      },
    });
  }
  return res.status(401).json({ error: "User not authenticated" });
});

// Start server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
