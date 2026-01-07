import express from "express";
import SipPlan from "../models/SipPlan.js";

const router = express.Router();

// GET all active plans
router.get("/", async (req, res) => {
  try {
    const plans = await SipPlan.find({ active: true }).sort({ createdAt: -1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new plan
router.post("/", async (req, res) => {
  try {
    const newPlan = new SipPlan(req.body);
    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a plan (e.g., adding members)
router.put("/:id", async (req, res) => {
  try {
    const updatedPlan = await SipPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE (Soft Delete)
router.delete("/:id", async (req, res) => {
  try {
    // We don't actually delete data to keep history, just mark inactive
    await SipPlan.findByIdAndUpdate(req.params.id, { active: false });
    res.json({ message: "Plan deactivated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;