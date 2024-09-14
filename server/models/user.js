const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  discordId: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String },
  avatar: { type: String }, // Add this line to store the profile picture URL
});

module.exports = mongoose.model("User", userSchema);
