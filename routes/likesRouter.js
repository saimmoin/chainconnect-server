/** @format */

const express = require("express");
const router = express.Router();
const Likes = require("../models/likesModel");
const { getLikes, setLikes } = require("../controllers/likesController");

router.get("/", getLikes);
router.post("/", setLikes);
