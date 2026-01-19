import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// ====================
// LOAD ENV
// ====================
dotenv.config();

// ======================
// CREATE APP
// ======================
const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://nexoracrew-finance.vercel.app",
      "https://finance.nexoracrew.com",
    ],
    credentials: true,
  })
);
// Enable Preflight for all routes
app.options('*', cors());

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
import marketRoutes from "./routes/market.routes.js";

// ======================
// ROUTES MOUNT
// ======================
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/banks", bankRoutes);
app.use("/api/v1/sip-plans", sipRoutes);
app.use("/api/v1/market", marketRoutes);

// ======================
// HEALTH CHECK
// ======================
app.get("/", (req, res) => {
  res.status(200).send("NEXORACREW backend running 🚀");
});

// ======================
// MONGODB CONNECTION
// ======================
// ======================
// MONGODB CONNECTION & SERVER START
// ======================


const startServer = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // START SERVER ONLY IF NOT ON VERCEL (Local Development)
    if (process.env.NODE_ENV !== 'production') {
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`🚀 Backend running locally on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

startServer();

// Vercel requires exporting the app
export default app;
