import express from "express";
import Camp from "../models/Camp.js";

const router = express.Router();

// View camps
router.get("/camps", async (req, res) => {
  const camps = await Camp.find();
  res.json(camps);
});

// Request help / Donate (simplified)
router.post("/request", async (req, res) => {
  // Save request in DB
  res.json({ message: "Request submitted" });
});

export default router;