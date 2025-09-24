import Request from "../models/request.model.js";
import User from "../models/user.model.js";

export const addRequest = async (req,res) => {
    const request = req.body;
    const {userid,shopid} = request;
    
};
