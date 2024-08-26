/** @format */

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    address: String,
    followers: Array,
    following: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
