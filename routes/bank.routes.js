import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json([]);
});

router.post("/", (req, res) => {
  res.json({ message: "Bank added" });
});

router.delete("/:id", (req, res) => {
  res.json({ message: "Bank deleted" });
});

export default router;
