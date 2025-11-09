import mongoose from "mongoose";

const rateSchema = new mongoose.Schema({
  color: {
    type: Number,
    default: 0,
    required: [true, "Color rate is required"],
  },
  a4: {
    type: Number,
    default: 0,
    required: [true, "A4 paper rate is required"],
  },
  a3: {
    type: Number,
    default: 0,
    required: [true, "A3 paper rate is required"],
  },
  a5: {
    type: Number,
    default: 0,
    required: [true, "A5 paper rate is required"],
  },
  spiral: {
    type: Number,
    default: 0,
    required: [true, "Spiral binding rate is required"],
  },
  soft: {
    type: Number,
    default: 0,
    required: [true, "Soft binding rate is required"],
  },
  single:{
    type: Number,
    default: 0,
    required: [true, "Single side rate is required"],
  },
  double:{
    type: Number,
    default: 0,
    required: [true, "Double side rate is required"],
  }

});

const xeroxSchema = new mongoose.Schema({
  xeroxId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "shopid is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  colorOption: {
    type: [
      {
        type: String,
        enum: ["bw", "color"],
      },
    ],
    default: [],
  },
  paperOption: {
    type: [
      {
        type: String,
        enum: ["A4", "A3", "A5"],
      },
    ],
    default: [],
  },
  layoutOption: {
    type: [
      {
        type: String,
        enum: ["potrait", "landscape"],
      },
    ],
    default: [],
  },
  sidesOption: {
    type: [
      {
        type: String,
        enum: ["single", "double"],
      },
    ],
    default: [],
  },
  bindingOption: {
    type: [
      {
        type: String,
        enum: ["soft", "spiral"],
      },
    ],
    default: [],
  },
  rates: {
    type: rateSchema,
    default: {},
    required: [true, "Rates are required"],
  },
});

const Xerox = mongoose.model("Xerox", xeroxSchema);
export default Xerox;
