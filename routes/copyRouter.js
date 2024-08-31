/** @format */

const router = require("express").Router();
const Copies = require("../models/copyModel");
const { getCopyByPostID, getTransferHistory } = require("../controllers/copyController");

router.get("/", getCopyByPostID);
router.get("/transfers", getTransferHistory);

module.exports = router;
