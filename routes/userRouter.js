/** @format */

const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { follow, unfollow, getUser } = require("../controllers/userController");

// Get user
router.get("/:id", getUser);

// Follow user
router.post("/", follow);

// Unfollow user
router.post("/", unfollow);

module.exports = router;
