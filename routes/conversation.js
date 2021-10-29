const router = require("express").Router();
const Conversation = require("../models/Conversation");

// create conversation
router.post("/", async (req, res) => {
  const newChat = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedChat = await newChat.save();
    res.status(200).json(savedChat);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conversation of user
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
