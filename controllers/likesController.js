/** @format */

const Likes = require("../models/likesModel.js");
const Post = require("../models/copyModel.js");

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

const setLikes = async (req, res) => {
  try {
    /**
     * find likes entry by post id
     * if (likes) entry exits get user index
     * if user like exits return same object
     * if not add user address into the array
     * if entry does not exits ADD entry in database
     */
    const { postId, userAddress } = req.body;

    const likesEntry = await Likes.findOne({ postId });
    console.log(likesEntry);

    if (likesEntry) {
      let userIndex = likesEntry.likes.indexOf(userAddress);
      if (userIndex > -1) {
        res.status(200).json({ data: likesEntry });
      } else {
        likesEntry.likes.push(userAddress);
        const newLikesSave = likesEntry.save();
        res.status(200).json({ data: newLikesSave });
      }
    } else {
      const newLikes = await Likes.create({
        postId: postId,
        likes: [userAddress],
      });
      res.status(200).json({ data: newLikes });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getLikes, setLikes };
