import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./dB/connectDB.js";
import authRoutes from "./routes/auth.route.js";

// MYwesoxseylK7woh
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

// Enable CORS for frontend
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hellooo....");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("started at Port: ", PORT);
});
