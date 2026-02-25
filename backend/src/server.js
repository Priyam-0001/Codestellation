import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import coordinatorRoutes from "./routes/coordinator.routes.js";
import volunteerRoutes from "./routes/volunteer.routes.js";
import publicRoutes from "./routes/public.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/coordinator", coordinatorRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));