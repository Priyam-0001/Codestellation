import express from "express";
import Camp from "../models/Camp.js";
import Donation from "../models/Donation.js";
import Alert from "../models/Alert.js";

const router = express.Router();

/* =========================
   CAMPS (Camp Locator)
========================= */

// Get all camps
router.get("/camps", async (req, res) => {
  const camps = await Camp.find();
  res.json(camps);
});

// Get single camp by ID
router.get("/camps/:id", async (req, res) => {
  const camp = await Camp.findById(req.params.id);
  if (!camp) return res.status(404).json({ message: "Camp not found" });
  res.json(camp);
});

/* =========================
   DONATIONS & REQUESTS
========================= */

// Submit a donation
router.post("/donate", async (req, res) => {
  try {
    const donation = await Donation.create({
      ...req.body,
      type: "donation"
    });
    res.json({ message: "Donation submitted", donation });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Submit a help request
router.post("/request", async (req, res) => {
  try {
    const request = await Donation.create({
      ...req.body,
      type: "request"
    });
    res.json({ message: "Help request submitted", request });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* =========================
   ALERTS (Public View)
========================= */

// View all alerts
router.get("/alerts", async (req, res) => {
  const alerts = await Alert.find().populate("camp").sort({ createdAt: -1 });
  res.json(alerts);
});

export default router;