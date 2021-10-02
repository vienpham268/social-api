const router = require("express").Router();
const Commnent = require("../models/Comment");
const Post = require("../models/Post");
// create a comment
router.post("/", async (req, res) => {
  const { postId } = req.body;
  const newComment = new Commnent(req.body);
  try {
    const savedComment = await newComment.save();
    if (savedComment) {
      const post = await Post.findById(postId);
      await post.updateOne({ $push: { comments: savedComment._id } });
    }
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find comment by id
router.get("/:id", async (req, res) => {
  try {
    const comment = await Commnent.findById(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
