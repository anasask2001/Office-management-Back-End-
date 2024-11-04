"use strict";
import express from "express";
import mongoose from "mongoose";
import Dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import adminroute from "./routes/admin/admin_route.js";
import loginroute from "./routes/common/auth.js";
import staffroute from "./routes/admin/staff_route.js";
import { errorHandler } from "./middleware/error_middleware.js";
import internroute from "./routes/admin/intern_route.js";
import rooms from "../Space_management_server/routes/admin/room_route.js";
import seat from "../Space_management_server/routes/admin/seat_route.js";
import staff from "./routes/staff/staff_route.js";
import booking from "../Space_management_server/routes/staff/booking_route.js"
import payment from "../Space_management_server/routes/admin/payment_route.js"
Dotenv.config();
const server = express();
const upload = multer();

server.use(express.json());

server.use(cors());
// server.use(
//   cors({
//     origin: "https://space-management.vercel.app",
//   })
// );

server.use("/api/admin", adminroute);
server.use("/api",payment)
server.use("/api", loginroute);
server.use("/api/admin/staff", staffroute);
server.use("/api/admin/intern", internroute);
server.use("/api/admin", rooms);
server.use("/api/admin", seat);
server.use("/api/staff", staff);
server.use("/api/staff",booking)
server.use(errorHandler);

// Local Host
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server Running in Port ${PORT}`);
});

// Connecting DB
mongoose
  .connect(process.env.DB, { dbName: "space-management" })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));