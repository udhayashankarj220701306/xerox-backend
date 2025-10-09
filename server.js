import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import xeroxRoutes from "./routes/xerox.route.js";
import requestRoutes from "./routes/request.route.js";

import { connectDB } from "./libs/db.js";

dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, 
    optionsSuccessStatus: 200,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" })); 
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/xerox", xeroxRoutes);
app.use("/api/request", requestRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});
if (process.env.NODE_ENV === "development") {
  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
  });
}



export  default app;
