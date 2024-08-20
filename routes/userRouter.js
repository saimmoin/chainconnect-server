/** @format */

const express = require("express");
const router = express.Router();
const User = require("../models/model");
const { getAllUsers, newUser, getSingleUser, updateUser, deleteUser } = require("../controllers/userController");

// Get all users
router.get("/", getAllUsers);

// Get a single user
router.get("/:id", getUser, getSingleUser);

// Create a new user
router.post("/", newUser);

// Update a user
router.put("/:id", getUser, updateUser);

// Delete a user
router.delete("/:id", getUser, deleteUser);

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
