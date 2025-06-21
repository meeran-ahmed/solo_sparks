const mongoose = require("mongoose");

const questSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  reflection: {
    text: String,
    image: String,
    audio: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Quest", questSchema);
