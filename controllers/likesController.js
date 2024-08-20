/** @format */

const Likes = require("../models/likesModel.js");

const getLikes = async (req, res) => {
  try {
    const likes = await Likes.find({
      postId: req.params.postId,
    });
    res.json({ data: likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getLikes };