import express from "express";
import { protect } from "../middleware/auth.js";

import Camp from "../models/Camp.js";
import Task from "../models/Task.js";
import Resource from "../models/Resource.js";
import Alert from "../models/Alert.js";

const router = express.Router();

// Only coordinators can access these routes
router.use(protect(["coordinator"]));

/* =========================
   CAMPS
========================= */

// Create a camp
router.post("/camps", async (req, res) => {
  try {
    const camp = await Camp.create(req.body);
    res.json(camp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all camps
router.get("/camps", async (req, res) => {
  const camps = await Camp.find();
  res.json(camps);
});

/* =========================
   TASKS
========================= */

// Create a task
router.post("/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all tasks
router.get("/tasks", async (req, res) => {
  const tasks = await Task.find().populate("assignedTo").populate("camp");
  res.json(tasks);
});

/* =========================
   RESOURCES
========================= */

// Add resource to a camp
router.post("/resources", async (req, res) => {
  try {
    const resource = await Resource.create(req.body);
    res.json(resource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all resources
router.get("/resources", async (req, res) => {
  const resources = await Resource.find().populate("camp");
  res.json(resources);
});

/* =========================
   ALERTS
========================= */

// Create alert
router.post("/alerts", async (req, res) => {
  try {
    const alert = await Alert.create(req.body);
    res.json(alert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all alerts
router.get("/alerts", async (req, res) => {
  const alerts = await Alert.find().populate("camp").sort({ createdAt: -1 });
  res.json(alerts);
});

/* =========================
   DASHBOARD STATS
========================= */

router.get("/stats", async (req, res) => {
  const totalCamps = await Camp.countDocuments();
  const totalTasks = await Task.countDocuments();
  const pendingTasks = await Task.countDocuments({ status: "pending" });
  const completedTasks = await Task.countDocuments({ status: "completed" });
  const totalResources = await Resource.countDocuments();
  const activeAlerts = await Alert.countDocuments();

  res.json({
    totalCamps,
    totalTasks,
    pendingTasks,
    completedTasks,
    totalResources,
    activeAlerts
  });
});

export default router;