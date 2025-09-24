import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  file: {
    type: String,
    required: [true, "File url is required"],
  },
  color: {
    type: Boolean,
    default: false,
  },
  paper: {
    type: String,
    enum: ["A4", "A3", "A5"],
    default: "A4",
  },
  layout: {
    type: String,
    enum: ["potrait", "landscape"],
    default: "potrait",
  },
  pages: [
    {
      start: Number,
      stop: Number,
    },
  ],
  binding: {
    type: Boolean,
    default: false,
  },
  bindingtype: {
    type: String,
    enum: ["soft", "spiral"],
    default: "soft",
  },
  sides: {
    type: String,
    enum: ["single", "double"],
    default: "single",
  },
  status: {
    type: String,
    enum: ["completed", "cancelled", "pending", "processing"],
    default: "pending",
  },
});

const requestScema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A request must belong to a user."],
    },
    xeroxId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A request must be for a specific Xerox shop."],
    },
    status: {
      type: String,
      enum: ["completed", "cancelled", "pending", "processing"],
      default: "pending",
    },
    files: [fileSchema],
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestScema);

export default Request;
