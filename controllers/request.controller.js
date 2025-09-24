import Request from "../models/request.model.js";

export const addRequest = async (req, res) => {
  const request = req.body;
  try {
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
    const { userId}= req.params.id;
    const { status, role } = req.query;
    if (role === "xerox") {
      const requests = await Request.find({ xeroxId: userId, status });
      return res.status(200).json(requests);
    }
    const requests = await Request.find({ userId, status });
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
    const updatedRequest = await Request.findByIdAndUpdate(requestId, updates, { new: true });
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
