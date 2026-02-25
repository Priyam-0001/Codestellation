import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["coordinator", "volunteer", "public"],
    required: true
  },

  // For volunteers
  skills: [{ type: String }],
  location: {
    lat: Number,
    lng: Number
  },

}, { timestamps: true });

export default mongoose.model("User", userSchema);