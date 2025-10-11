import mongoose from "mongoose";

const xeroxSchema = new mongoose.Schema({
  xeroxId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "shopid is required"],
  },
  name:{
    type: String,
    required: [true, "Name is required"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  colorOption: [
    {
      type: String,
      enum: ["bw", "color"],
    },
  ],
  paperOption: [
    {
      type: String,
      enum: ["A4", "A3", "A5"],
    },
  ],
  layoutOption: [
    {
      type: String,
      enum: ["potrait", "landscape"],
    },
  ],
  sidesOption: [
    {
      type: String,
      enum: ["single", "double"],
    },
  ],
  bindingOption: [
    {
      type: String,
      enum: ["soft", "spiral"],
    },
  ],
});

const Xerox = mongoose.model("Xerox", xeroxSchema);
export default Xerox;
