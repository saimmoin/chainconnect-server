/** @format */

const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { follow, unfollow, getUserFolowersFollowing, postUser } = require("../controllers/userController");

// Get user
router.get("/:address", getUserFolowersFollowing);

//create user
router.post("/", postUser);

// Follow user
router.post("/follow", follow);

// Unfollow user
router.post("/unfllow", unfollow);

module.exports = router;
