import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String },
  date: { type: String, required: true },
  type: { type: String, enum: ['INCOME', 'EXPENSE'], required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, default: 'CASH' },
  description: { type: String },
  investmentType: { type: String, default: 'SINGLE' }, // 'SINGLE' or 'TEAM'
  investors: [{ type: String }], // Array of names if TEAM
  attachment: { type: String }, // Base64 string or URL
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;