import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;
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

export default model("Todo", todoSchema);
