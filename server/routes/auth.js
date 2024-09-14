const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const router = express.Router();

// Route to start Discord OAuth
router.get("/discord", passport.authenticate("discord"));

// Route for Discord OAuth callback
router.get(
  "/discord/callback",
  passport.authenticate("discord", {
    failureRedirect: "/login",
    session: true,
  }),
  async (req, res) => {
    try {
      const { id, username, avatar } = req.user;

      // Check if user exists in the database
      let user = await User.findOne({ discordId: id });
      if (!user) {
        // Store user with avatar if they don't exist
        user = new User({
          discordId: id,
          username,
          avatar: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`,
        });
        await user.save();
      }

      // After successful authentication, redirect to frontend app
      res.redirect("http://localhost:3000/leaderboard"); // Or any route you want to redirect to
    } catch (error) {
      console.error("Error during Discord callback:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out" });
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to destroy session" });
      }

      // Clear the cookie
      res.clearCookie("connect.sid", { path: "/" });
      return res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

module.exports = router;
