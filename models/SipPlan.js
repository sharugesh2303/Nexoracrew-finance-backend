import mongoose from "mongoose";

const sipPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  startDate: { type: String, required: true },
  dayOfMonth: { type: Number, required: true }, // The "Deduction Day"
  splitType: { type: String, enum: ['EQUAL', 'CUSTOM'], default: 'EQUAL' },
  members: [{
    name: { type: String, required: true },
    amount: { type: Number, required: true }
  }],
  active: { type: Boolean, default: true }
}, { timestamps: true });

const SipPlan = mongoose.model("SipPlan", sipPlanSchema);
export default SipPlan;