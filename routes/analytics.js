import express from "express";
import { logView, getAnalytics } from "../controllers/analyticsController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/view", logView); // public
router.get("/stats", getAnalytics); // protected

export default router;
