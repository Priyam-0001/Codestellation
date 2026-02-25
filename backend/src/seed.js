import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import { connectDB } from "./config/db.js";

import User from "./models/User.js";
import Camp from "./models/Camp.js";
import Task from "./models/Task.js";
import Resource from "./models/Resource.js";
import Alert from "./models/Alert.js";
import Donation from "./models/Donation.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log("🌱 Seeding database...");

    // Clear existing data
    await User.deleteMany();
    await Camp.deleteMany();
    await Task.deleteMany();
    await Resource.deleteMany();
    await Alert.deleteMany();
    await Donation.deleteMany();

    // Password hash
    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = await User.create({
      name: "Govt Admin",
      email: "admin@govt.com",
      password: hashedPassword,
      role: "admin"
    });

    // Create users
    const coordinator = await User.create({
      name: "Admin Coordinator",
      email: "admin@test.com",
      password: hashedPassword,
      role: "coordinator"
    });

    const volunteer1 = await User.create({
      name: "Volunteer One",
      email: "vol1@test.com",
      password: hashedPassword,
      role: "volunteer",
      skills: ["logistics", "distribution"],
      location: { lat: 26.15, lng: 91.77 }
    });

    const volunteer2 = await User.create({
      name: "Volunteer Two",
      email: "vol2@test.com",
      password: hashedPassword,
      role: "volunteer",
      skills: ["medical", "first aid"],
      location: { lat: 26.18, lng: 91.75 }
    });

    const publicUser = await User.create({
      name: "Public User",
      email: "public@test.com",
      password: hashedPassword,
      role: "public"
    });

    // Create camps
    const camp1 = await Camp.create({
      name: "Relief Camp A",
      location: {
        address: "Paltan Bazaar, Guwahati",
        lat: 26.1445,
        lng: 91.7362,
      },
      capacity: 200,
      currentOccupancy: 120,
      criticalNeeds: ["Water", "Medicines"],
    });

    const camp2 = await Camp.create({
      name: "Relief Camp B",
      location: {
        address: "Dispur, Guwahati",
        lat: 26.1516,
        lng: 91.7859,
      },
      capacity: 150,
      currentOccupancy: 80,
      criticalNeeds: ["Food"],
    });

    // Create tasks
    const task1 = await Task.create({
      title: "Distribute food packets",
      description: "Distribute food to families",
      requiredSkills: ["logistics"],
      status: "pending",
      camp: camp1._id,
      location: {
        lat: 26.1445,
        lng: 91.7362,
  },

    });

    const task2 = await Task.create({
      title: "Medical checkup",
      description: "Basic health check for camp residents",
      requiredSkills: ["medical"],
      status: "assigned",
      assignedTo: volunteer2._id,
      camp: camp2._id,
      location: {
        lat: 26.1445,
        lng: 91.7362,
      },

    });

    // Create resources
    await Resource.create([
      {
        name: "Rice Bags",
        type: "food",
        quantity: 50,
        camp: camp1._id,
        status: "available"
      },
      {
        name: "First Aid Kits",
        type: "medical",
        quantity: 10,
        camp: camp2._id,
        status: "low"
      }
    ]);

    // Create alerts
    await Alert.create([
      {
        title: "Medicine Shortage",
        message: "Urgent need for medical supplies",
        severity: "critical",
        camp: camp2._id
      },
      {
        title: "Food Running Low",
        message: "Food stock is running low at Camp Alpha",
        severity: "warning",
        camp: camp1._id
      }
    ]);

    // Create donations / requests
    await Donation.create([
      {
        donorName: "John Doe",
        item: "Blankets",
        quantity: 20,
        camp: camp2._id,
        type: "donation"
      },
      {
        donorName: "Local NGO",
        item: "Drinking Water",
        quantity: 100,
        camp: camp1._id,
        type: "donation"
      }
    ]);

    console.log("✅ Database seeded successfully!");
    console.log("👤 Coordinator login: admin@test.com / 123456");
    console.log("🧍 Volunteer login: vol1@test.com / 123456");
    console.log("🧍 Volunteer login: vol2@test.com / 123456");

    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedData();