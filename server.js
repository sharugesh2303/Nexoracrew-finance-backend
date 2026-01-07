import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// ====================
// LOAD ENV
// =====================
dotenv.config();

// ======================
// CREATE APP (IMPORTANT: FIRST)
// ======================
const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(
  cors({
    origin: "*", // later you can restrict this to your frontend URL
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ======================
// ROUTES IMPORT
// ======================
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import bankRoutes from "./routes/bank.routes.js";
import sipRoutes from "./routes/sip.routes.js";
import marketRoutes from "./routes/market.routes.js"; // ✅ Added Market Routes

// ======================
// ROUTES MOUNT
// ======================
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/banks", bankRoutes);
app.use("/api/v1/sip-plans", sipRoutes);
app.use("/api/v1/market", marketRoutes); // ✅ Added Market Mount Point

// ======================
// HEALTH CHECK
// ======================
app.get("/", (req, res) => {
  res.status(200).send("NEXORACREW backend running 🚀");
});

// ======================
// MONGODB CONNECTION
// ======================
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true,
    });

    console.log(
      `✅ MongoDB Connected: ${conn.connection.host}`
    );
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// ======================
// GLOBAL ERROR HANDLER
// ======================
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});