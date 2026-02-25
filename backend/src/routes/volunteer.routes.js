import express from "express";
import { protect } from "../middleware/auth.js";
import Task from "../models/Task.js";
import Alert from "../models/Alert.js";

const router = express.Router();

// Only volunteers can access these routes
router.use(protect(["volunteer"]));

/* =========================
   TASKS
========================= */

// View all pending tasks
router.get("/tasks", async (req, res) => {
  const tasks = await Task.find({ status: "pending" }).populate("camp");
  res.json(tasks);
});

// Accept a task
router.post("/tasks/:id/accept", async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found" });
  if (task.status !== "pending") {
    return res.status(400).json({ message: "Task already assigned or completed" });
  }

  task.status = "assigned";
  task.assignedTo = req.user.id;
  await task.save();

  res.json({ message: "Task accepted", task });
});

// Mark task as completed
router.post("/tasks/:id/complete", async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.assignedTo?.toString() !== req.user.id) {
    return res.status(403).json({ message: "You are not assigned to this task" });
  }

  task.status = "completed";
  await task.save();

  res.json({ message: "Task completed", task });
});

/* =========================
   ALERTS
========================= */

// View all alerts
router.get("/alerts", async (req, res) => {
  const alerts = await Alert.find().populate("camp").sort({ createdAt: -1 });
  res.json(alerts);
});

export default router;