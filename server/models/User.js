const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  sparkPoints: { type: Number, default: 0 }, // ✅ added
});

module.exports = mongoose.model("User", userSchema);
