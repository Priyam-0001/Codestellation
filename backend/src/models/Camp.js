import mongoose from "mongoose";

const campSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    lat: Number,
    lng: Number,
    address: String
  },
  capacity: { type: Number, default: 0 },
  currentOccupancy: { type: Number, default: 0 },

  criticalNeeds: [{ type: String }] // e.g. ["Food", "Medicine", "Water"]
}, { timestamps: true });

export default mongoose.model("Camp", campSchema);