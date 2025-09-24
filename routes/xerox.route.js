import express from "express";
import { updateProfile, createProfile } from "../controllers/xerox.controller.js";
import { protectRoute,xeroxRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.patch("/profile/:id", protectRoute, xeroxRoute, updateProfile);
router.post("/profile", protectRoute, xeroxRoute, createProfile);

export default router;