const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "title is required"] },
    description: { type: String, required: [true, "description is required"] },
    status: {
      type: String,
      required: [true, "status is required"],
      enum: ["active", "completed"],
    },
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
      required: [true, "user id required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("tasks", schema);
