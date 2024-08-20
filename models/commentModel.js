/** @format */

const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    postId: String,
    comment: String,
    userAddress: String,
    userName: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Comment", commentSchema);