import Xerox from "../models/xerox.model.js";

export const getProfile = async (req, res) => {
    try {
        const xeroxId = req.params.id;
        const xeroxProfile = await Xerox.findOne({ xeroxId });
        if (!xeroxProfile) {
            return res.status(404).json({ message: "Xerox profile not found" });
        }
        else {
            res.status(200).json(xeroxProfile);
        }
    } catch (error) {
        console.log("Error in getProfile controller", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const createProfile = async (req,res) => {
    try{
        const xeroxProfile = new Xerox(req.body);
        await xeroxProfile.save();
        res.status(201).json(xeroxProfile);
    } catch (error) {
        console.log("Error in createProfile controller", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const xeroxId = req.params.id;
        const updates = req.body;
        const xeroxProfile = await Xerox.findOneAndUpdate({ xeroxId }, updates, { new: true });
        if (!xeroxProfile) {
            return res.status(404).json({ message: "Xerox profile not found" });
        }
        else {
            res.status(200).json(xeroxProfile);
        }
    } catch (error) {
        console.log("Error in updateProfile controller", error.message);
        res.status(500).json({ message: error.message });
    }
}
export const getProfiles = async (req, res) => {
  try {
    const xeroxProfiles = await Xerox.find({});
    if (!xeroxProfiles) {
      return res.status(404).json({ message: "Xerox profile not found" });
    } else {
      res.status(200).json(xeroxProfiles);
    }
  } catch (error) {
    console.log("Error in getProfile controller", error.message);
    res.status(500).json({ message: error.message });
  }
};