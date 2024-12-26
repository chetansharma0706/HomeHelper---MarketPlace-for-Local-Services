import express from "express";
import { signup, login, logout } from "../controllers/auth.controllers.js";
import { useAuth } from "../middleware/useAuth.js";
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/login-me", useAuth, (req, res) => {
  res.json({ success: true, message: "Access granted", user: req.user });
});

export default router;
