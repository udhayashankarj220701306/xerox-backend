import express from "express";
import {
  updateProfile,
  createProfile,
  getProfile,
  getProfiles,
} from "../controllers/xerox.controller.js";
import { protectRoute, xeroxRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile/:id", protectRoute, getProfile);
router.get("/profiles", protectRoute, getProfiles);
router.patch("/profile/:id", protectRoute, xeroxRoute, updateProfile);
router.post("/profile", protectRoute, xeroxRoute, createProfile);

export default router;
