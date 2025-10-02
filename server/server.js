import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";

// app config
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

// middlewares
app.use(express.json());
app.use(cors());

// api end points
app.get("/", (req, res) => {
  res.json({ msg: "api is working" });
});

// initialize the server
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
