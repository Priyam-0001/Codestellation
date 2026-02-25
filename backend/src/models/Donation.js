import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donorName: String,

  item: { type: String, required: true },
  quantity: { type: Number, default: 1 },

  camp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Camp"
  },

  type: {
    type: String,
    enum: ["donation", "request"],
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Donation", donationSchema);