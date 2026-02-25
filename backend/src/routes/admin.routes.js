import express from "express";
import { protect } from "../middleware/auth.js";

import User from "../models/User.js";
import Camp from "../models/Camp.js";
import Task from "../models/Task.js";
import Resource from "../models/Resource.js";
import Alert from "../models/Alert.js";
import Donation from "../models/Donation.js";

const router = express.Router();

// Only admin (government) can access
router.use(protect(["admin"]));

/* =========================
   USERS OVERVIEW
========================= */

// Get all users
router.get("/users", async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Get coordinators only
router.get("/users/coordinators", async (req, res) => {
  const users = await User.find({ role: "coordinator" }).select("-password");
  res.json(users);
});

// Get volunteers only
router.get("/users/volunteers", async (req, res) => {
  const users = await User.find({ role: "volunteer" }).select("-password");
  res.json(users);
});

/* =========================
   SYSTEM OVERVIEW
========================= */

// Get all camps
router.get("/camps", async (req, res) => {
  const camps = await Camp.find();
  res.json(camps);
});

// Get all tasks
router.get("/tasks", async (req, res) => {
  const tasks = await Task.find().populate("assignedTo").populate("camp");
  res.json(tasks);
});

// Get all resources
router.get("/resources", async (req, res) => {
  const resources = await Resource.find().populate("camp");
  res.json(resources);
});

// Get all alerts
router.get("/alerts", async (req, res) => {
  const alerts = await Alert.find().populate("camp").sort({ createdAt: -1 });
  res.json(alerts);
});

// Get all donations & requests
router.get("/donations", async (req, res) => {
  const donations = await Donation.find().populate("camp").sort({ createdAt: -1 });
  res.json(donations);
});

/* =========================
   GLOBAL DASHBOARD STATS
========================= */

router.get("/stats", async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalCamps = await Camp.countDocuments();
  const totalTasks = await Task.countDocuments();
  const completedTasks = await Task.countDocuments({ status: "completed" });
  const pendingTasks = await Task.countDocuments({ status: "pending" });
  const totalResources = await Resource.countDocuments();
  const totalAlerts = await Alert.countDocuments();
  const totalDonations = await Donation.countDocuments();

  res.json({
    totalUsers,
    totalCamps,
    totalTasks,
    completedTasks,
    pendingTasks,
    totalResources,
    totalAlerts,
    totalDonations
  });
});

export default router;