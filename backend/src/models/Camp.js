import mongoose from "mongoose";

const campSchema = new mongoose.Schema({
  name: String,
  location: String,
  resources: [String]
}, { timestamps: true });

export default mongoose.model("Camp", campSchema);