import express from "express";
import { getProfile, getUsers } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUsers);
router.get("/profile", protect, getProfile);

export default router;
