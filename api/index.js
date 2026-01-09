import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// ====================
// LOAD ENV
// ====================
dotenv.config();

// ====================
// CREATE APP
// ====================
const app = express();

// ====================
// MIDDLEWARE
// ====================
app.use(
    cors({
        origin: "*",
        credentials: true
    })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ====================
// ROUTES IMPORT
// ====================
import authRoutes from "../routes/auth.routes.js";
import userRoutes from "../routes/user.routes.js";
import transactionRoutes from "../routes/transaction.routes.js";
import bankRoutes from "../routes/bank.routes.js";
import sipRoutes from "../routes/sip.routes.js";
import marketRoutes from "../routes/market.routes.js";

// ====================
// ROUTES MOUNT
// ====================
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/banks", bankRoutes);
app.use("/api/v1/sip-plans", sipRoutes);
app.use("/api/v1/market", marketRoutes);

// ====================
// HEALTH CHECK
// ====================
app.get("/", (req, res) => {
    res.status(200).send("NEXORACREW backend running 🚀");
});

// ====================
// MONGODB CONNECTION (SERVERLESS SAFE)
// ====================
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URI, {
            autoIndex: true
        });
    }

    cached.conn = await cached.promise;
    console.log("✅ MongoDB Connected");
    return cached.conn;
};

await conn
