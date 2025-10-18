import express from "express";
import {
  getAllOrders,
  getUserOrders,
  placeCodOrder,
  placeStripeOrder,
  updateOrderStatus,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middlewares/adminAuth.js";
import userAuth from "../middlewares/userAuth.js";

const orderRouter = express.Router();

orderRouter.get("/list", adminAuth, getAllOrders);
orderRouter.put("/update", adminAuth, updateOrderStatus);

orderRouter.post("/cod", userAuth, placeCodOrder);
orderRouter.post("/stripe", userAuth, placeStripeOrder);
orderRouter.post("/stripeVerify", userAuth, verifyStripe);
orderRouter.post("/userOrder", userAuth, getUserOrders);

export default orderRouter;
