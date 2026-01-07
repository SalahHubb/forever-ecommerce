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
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
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
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    console.log(`Forever e-commerce server is running on port ${PORT}`)
  );
}

export default app;
