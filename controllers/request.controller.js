import Request from "../models/request.model.js";
import { uploadFileToBlob } from "./blob.controller.js";

export const addRequest = async (req, res) => {
  const files = req.files; // Access files from req.
  // console.log("Files received:", files);
  if (files && files.length > 0) {
    try {
      const fileUrls = await Promise.all(
        files.map((file) => uploadFileToBlob(file))
      );
      req.body.fileUrls = fileUrls; // Add file URLs to request body
    } catch (error) {
      console.log("Error uploading files", error.message);
      return res.status(500).json({ message: "Error uploading files" });
    }
  } else {
    return res.status(400).send("No files uploaded.");
  }
  const request = req.body;
  // console.log("fileUrls:", req.body.fileUrls);
  // console.log("Request body:", request);
  try {
    req.body.fileUrls.forEach((fileUrl, index) => {
      // console.log("request.files before:", request.files[index]);
      request.files[index].file = fileUrl;
    });
    const newRequest = new Request(request);
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    console.log("Error in addRequest controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getRequests = async (req, res) => {
  try {
    // console.log(
    //   "User making request:",
    //   req.user._id,
    //   "with role:",
    //   req.user.role,
    //   "and query params:", req.query
    // );
    const userId = req.user._id;
    const status = req.query["status[]"];
    // console.log(
    //   "Fetching requests for userId:",
    //   userId,
    //   "with status:",
    //   status,
    //   "and role:",
    //   req.user.role
    // );
    const query = {};
    if (req.user.role === "xerox") {
      query.xeroxId = userId;
    } else {
      query.userId = userId;
    }
    if (status) {
      query.status = { $in: status };
    }
    // console.log("Query being used:", query);
    const requests = await Request.find(query)
      .sort({ createdAt: -1 })
      .populate("userId", "isLocked");
    res.status(200).json(requests);
  } catch (error) {
    console.log("Error in getRequests controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const updates = req.body;
    const updatedRequest = await Request.findByIdAndUpdate(requestId, updates, {
      new: true,
    });
    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.log("Error in updateRequest controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const deletedRequest = await Request.findByIdAndDelete(requestId);
    if (!deletedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    console.log("Error in deleteRequest controller", error.message);
    res.status(500).json({ message: error.message });
  }
};
