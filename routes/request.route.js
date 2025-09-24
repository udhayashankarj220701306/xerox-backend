import express from "express";
import { addRequest,getRequests,updateRequest,deleteRequest } from "../controllers/request.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/add", protectRoute, addRequest);
router.get("/", protectRoute, getRequests);
router.patch("/:id", protectRoute, updateRequest);
router.delete("/:id", protectRoute, deleteRequest);

export default router;