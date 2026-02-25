import express from "express";
import { protect } from "../middleware/auth.js";
import Task from "../models/Task.js";

const router = express.Router();

router.use(protect(["volunteer"]));

// View tasks
router.get("/tasks", async (req, res) => {
  const tasks = await Task.find({ status: "pending" });
  res.json(tasks);
});

// Accept task
router.post("/tasks/:id/accept", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status: "assigned", assignedTo: req.user.id },
    { new: true }
  );
  res.json(task);
});

// Update task status
router.post("/tasks/:id/complete", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status: "completed" },
    { new: true }
  );
  res.json(task);
});

export default router;