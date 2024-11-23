/** @format */

const User = require("../models/userModel");

const getUserFolowersFollowing = async (req, res) => {
  try {
    console.log("get userdata request", req.params.address);
    const user = await User.findOne({ address: req.params.address });
    if (!user) {
      throw new Error("no user");
    }
    // res.json({
    //   data: {
    //     address: "0x26535f1847ed844C9b218b4DB46e199111F8a58b",
    //     followers: [
    //       "0x373bC629c246eE43D7dcb9F30087327e7fD8b997",
    //       "0x373bC629c246eE43D7dcb9F30087327e7fD8b997",
    //       "0x373bC629c246eE43D7dcb9F30087327e7fD8b997",  
    //     ],
    //     following: [
    //       "0x5133433121b30A5a639AbF57cD1E6A8BD1eC9c2A",
    //       "0x5133433121b30A5a639AbF57cD1E6A8BD1eC9c2A",
    //       "0x5133433121b30A5a639AbF57cD1E6A8BD1eC9c2A",
    //     ],
    //   },
    // });

    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postUser = async (req, res) => {
  try {
    const { userAddress } = req.body;
    const user = await User.findOne({ address: userAddress });
    if (!user) {
      const newUser = await User.create({ address: userAddress });
      res.status(200).json({ data: newUser });
    }
  } catch (error) {
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

module.exports = { follow, unfollow, getUserFolowersFollowing, postUser };
