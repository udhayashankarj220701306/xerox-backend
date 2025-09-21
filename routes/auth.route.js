import express from "express";
import { login, logout, signup, refreshToken, getProfile, updateUserData } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protectRoute, logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoute, getProfile);
router.patch("/user/:id",protectRoute, updateUserData);

export default router;
