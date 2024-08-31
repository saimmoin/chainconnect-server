/** @format */

const User = require("../models/userModel");

const getUserFolowersFollowing = async (req, res) => {
  try {
    const user = await User.findOne({ userAddress: req.param.userAddress });
    if (!user) {
      throw new Error("no user");
    }
    res.json({
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const unfollow = async (req, res) => {
  try {
    const { userAddress, followerAddress } = req.body;
    const userFollowing = await User.findOneAndUpdate({ address: userAddress }, { $pull: { following: followerAddress } });

    const userFollower = await User.findOneAndUpdate({ address: followerAddress }, { $pull: { followers: userAddress } });

    res.status(200).json({ data: { userAddress, userFollowing, userFollower } });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const follow = async (req, res) => {
  try {
    const { userAddress, followerAddress } = req.body;
    const userFollowing = await User.updateOne({ address: userAddress }, { $addToSet: { following: followerAddress } }, { new: true });

    const userFollower = await User.updateOne({ address: followerAddress }, { $addToSet: { followers: userAddress } }, { new: true });

    res.status(200).json({ data: { userAddress, userFollowing, userFollower } });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { follow, unfollow, getUserFolowersFollowing };
