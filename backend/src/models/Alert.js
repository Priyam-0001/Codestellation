import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String },

  severity: {
    type: String,
    enum: ["info", "warning", "critical"],
    default: "info"
  },

  camp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Camp"
  }
}, { timestamps: true });

export default mongoose.model("Alert", alertSchema);