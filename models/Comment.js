const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    userPicture: {
      type: String,
    },
    desc: {
      type: String,
      max: 500,
      required: true,
    },
    image: {
      type: String,
    },
    likes: {
      type: Array,
    },
    subComments: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
