import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,

  requiredSkills: [{ type: String }],

  status: {
    type: String,
    enum: ["pending", "assigned", "completed"],
    default: "pending"
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  camp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Camp"
  }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);