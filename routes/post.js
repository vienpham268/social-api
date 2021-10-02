const Post = require("../models/Post");
const User = require("../models/User");

const router = require("express").Router();

// create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// update a user's post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The post has been updated");
    } else {
      return res.status(403).json("You can update your post only!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// add commentid to post.comments Array
router.put('/:id',async(req,res)=>{
  try {
    
  } catch (error) {
    
  }
})

// delete the post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("The post has been deleted");
    } else {
      return res.status(403).json("You can delete your post only!");
    }
  } catch (err) {
    console.log("err", err.message);
    res.status(500).json(err);
  }
});

// like-dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get timelines of user's all posts
router.get("/timeline/:userid", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userid);
    const currentUserPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => Post.find({ userId: friendId }))
    );

    res.status(200).json(currentUserPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

// get only user's posts
router.get("/profile/:userid", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userid });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
