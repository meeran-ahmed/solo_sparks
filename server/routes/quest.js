const express = require("express");
const router = express.Router();
const Quest = require("../models/Quest");
const User = require("../models/User");

// ✅ Generate a new quest
router.post("/generate", async (req, res) => {
  const { userId } = req.body;
  console.log("📥 Quest generation request received with userId:", userId);

  if (!userId) {
    console.warn("⚠️ No userId provided in request body");
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const newQuest = await Quest.create({
      userId,
      title: "Reflect on your day",
      description: "Write or speak about something meaningful you did today.",
      status: "pending",
      reflection: {
        text: "",
        image: "",
        audio: ""
      }
    });

    console.log("✅ Quest created:", newQuest);
    res.status(201).json(newQuest);
  } catch (err) {
    console.error("❌ Error generating quest:", err.message);
    console.error("Full error:", err);
    res.status(500).json({ error: "Quest generation failed", details: err.message });
  }
});

// ✅ Get quests for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const quests = await Quest.find({ userId: req.params.userId });
    res.json(quests);
  } catch (err) {
    console.error("❌ Error fetching quests:", err.message);
    res.status(500).json({ error: "Failed to get quests" });
  }
});

// ✅ Mark quest as complete
router.put("/:id/complete", async (req, res) => {
  const { text, image, audio } = req.body;

  try {
    const quest = await Quest.findById(req.params.id);
    if (!quest) return res.status(404).json({ error: "Quest not found" });

    quest.status = "completed";
    quest.reflection = { text, image, audio };
    await quest.save();

    // ⭐ Award points
    await User.findByIdAndUpdate(quest.userId, { $inc: { sparkPoints: 10 } });

    res.json({ message: "Quest completed", quest });
  } catch (err) {
    console.error("❌ Error completing quest:", err.message);
    res.status(500).json({ error: "Failed to complete quest" });
  }
});

module.exports = router;
