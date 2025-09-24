import express from "express";
import { addRequest,getRequests,updateRequest,deleteRequest } from "../controllers/request.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/add", protectRoute, addRequest);
router.get("/fetch/:id", protectRoute, getRequests);
router.patch("/update/:id", protectRoute, updateRequest);
router.delete("/delete/:id", protectRoute, deleteRequest);