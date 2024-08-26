/** @format */

const User = require("../models/userModel");

const getUser = async (req, res) => {
  try {
    const users = await User.findOne({ userAddress: req.param.userAddress });
    if (!users) {
      throw new Error("no user");
    }
    res.json(users);
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
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { follow, unfollow, getUser };
