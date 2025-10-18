import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

// middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173", // frontend dev
      "http://localhost:5174", // admin dev
      "https://forever-frontend-six-amber.vercel.app/", // frontend prod
      "https://forever-admin-one-smoky.vercel.app", // admin prod
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Forever e-commerce api is working...");
});

// api end points
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// initialize the server
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
