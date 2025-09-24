import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import xeroxRoutes from "./routes/xerox.route.js";

import { connectDB } from "./libs/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/xerox", xeroxRoutes);

app.listen(PORT, () => {
  console.log(
    "Server is running on http://localhost:" + PORT
  );
  connectDB();
});
