/** @format */

const express = require("express");
const router = express.Router();
const Comment = require("../models/commentModel");
const { getComment, setComment } = require("../controllers/commentController");

router.get("/", getComment);
router.post("/", setComment);