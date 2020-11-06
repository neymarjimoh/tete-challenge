// import { Schema, model } from "mongoose";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// export default model("Todo", todoSchema);
module.exports = mongoose.model("Todo", todoSchema);
