import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";

// app config
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

// middlewares
app.use(express.json());
app.use(cors());

// api end points
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

// initialize the server
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
