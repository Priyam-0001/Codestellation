import express from "express";
import { protect } from "../middleware/auth.js";
import Camp from "../models/Camp.js";
import Task from "../models/Task.js";

const router = express.Router();

// Only coordinator
router.use(protect(["coordinator"]));

// Create camp
router.post("/camps", async (req, res) => {
  const camp = await Camp.create(req.body);
  res.json(camp);
});

// Create task
router.post("/tasks", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// Broadcast alert (simple example)
router.post("/alerts", async (req, res) => {
  // save alert in DB
  res.json({ message: "Alert broadcasted" });
});

export default router;