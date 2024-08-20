/** @format */

const { Schema, model } = require("mongoose");

const likesSchema = new Schema(
  {
    postId: { type: String, required: true },
    likes: { type: Array, required: true },
    claimedLikesCount: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Likes", likesSchema);
