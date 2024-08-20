/** @format */

const { Schema, model } = require("mongoose");

const copySchema = new Schema(
  {
    postId: { type: String, required: true },
    pHash: { type: String, required: true },
    copyOf: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Copy", copySchema);
