import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true, default: "COD" },
  address: { type: Object, required: true, default: {} },
  status: { type: String, required: true, default: "order placed" },
  payment: { type: Boolean, required: true, default: false },
  date: { type: String, required: true },
});

const Order = mongoose.model.orders || mongoose.model("order", orderSchema);

export default Order;
