import express from "express";
import multer from "multer";
import { addRequest,getRequests,updateRequest,deleteRequest } from "../controllers/request.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();
router.post("/add", protectRoute,upload.array("blobFiles"), addRequest);
router.get("/", protectRoute, getRequests);
router.patch("/:id", protectRoute, updateRequest);
router.delete("/:id", protectRoute, deleteRequest);

export default router;