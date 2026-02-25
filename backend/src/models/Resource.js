import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Rice", "First Aid Kit"
  type: { type: String }, // food, medical, shelter, etc.
  quantity: { type: Number, default: 0 },

  camp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Camp"
  },

  status: {
    type: String,
    enum: ["available", "low", "out"],
    default: "available"
  }
}, { timestamps: true });

export default mongoose.model("Resource", resourceSchema);