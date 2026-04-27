import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Auth API is running",
    endpoints: {
      register: "POST /api/auth/register",
      login: "POST /api/auth/login",
    },
  });
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/register", (req, res) => {
  res.status(405).json({ message: "Use POST /register to create an account" });
});
router.get("/login", (req, res) => {
  res.status(405).json({ message: "Use POST /login to authenticate" });
});

export default router;
