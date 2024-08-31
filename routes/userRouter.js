/** @format */

const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { follow, unfollow, getUserFolowersFollowing } = require("../controllers/userController");

// Get user
router.get("/:id", getUserFolowersFollowing);

// Follow user
router.post("/", follow);

// Unfollow user
router.post("/", unfollow);

module.exports = router;
