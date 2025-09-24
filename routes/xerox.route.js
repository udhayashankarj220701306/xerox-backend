import express from "express";
import { updateProfile } from "../controllers/xerox.controller.js";
import { protectRoute,xeroxRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.patch("/profile/:id", protectRoute, xeroxRoute, updateProfile);