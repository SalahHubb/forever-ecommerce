import express from "express";
import {
  addItem,
  clearCart,
  deleteItem,
  getUserCart,
  updateItemSize,
} from "../controllers/cartController.js";
import userAuth from "../middlewares/userAuth.js";

const cartRouter = express.Router();

cartRouter.post("/get", userAuth, getUserCart);
cartRouter.post("/add", userAuth, addItem);
cartRouter.put("/update", userAuth, updateItemSize);
cartRouter.delete("/delete", userAuth, deleteItem);
cartRouter.post("/clear", userAuth, clearCart);

export default cartRouter;
