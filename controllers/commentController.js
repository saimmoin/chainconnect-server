/** @format */

const Comments = require("../models/commentModel");
const Post = require("../models/copyModel");

const getComment = async (req, res) => {
  try {
    const comments = await Comments.find({
      postId: req.params.postId,
    });
    res.json({ data: comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const setComment = async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await Post.find({ postId });

    if (!post) throw new Error("No post");

    const commentPayload = new Comments({
      postId: req.body.postId,
      comment: req.body.comment,
      userAddress: req.body.userAddress,
      userName: req.body.userName,
    });
    console.log("comment", commentPayload);

    const newComment = await commentPayload.save();
    res.status(200).json({ data: { ...newComment } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getComment,
  setComment,
};
