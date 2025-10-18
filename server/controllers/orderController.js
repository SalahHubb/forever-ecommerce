import Order from "../models/orderSchema.js";
import User from "../models/userSchema.js";
import "dotenv/config";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// admin functionality
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.json({ success: true, orders });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};
const updateOrderStatus = async (req, res) => {
  const { orderId, currentStatus } = req.body;

  try {
    const userOrder = await Order.findByIdAndUpdate(orderId, {
      status: currentStatus,
    });

    return res.json({ success: true, msg: "order status updated", userOrder });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

// user functionality
const getUserOrders = async (req, res) => {
  const { userId } = req.body;

  try {
    const userOrder = await Order.findOne({ userId });

    return res.json({ success: true, userOrder });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

// payments
const placeCodOrder = async (req, res) => {
  const { userId, items, amount, address } = req.body;

  try {
    const newOrder = new Order({
      userId,
      items,
      amount,
      address,
      date: Date.now(),
    });

    const order = await newOrder.save();

    return res.json({ success: true, msg: "cod order placed", order });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};
const placeStripeOrder = async (req, res) => {
  // create a checkout session - area where user fill their detail and pay
  const { userId, items, amount, address } = req.body;

  // save order to db
  const newOrder = new Order({
    userId,
    items,
    amount,
    address,
    paymentMethod: "Stripe",
    date: Date.now(),
  });

  const order = await newOrder.save();

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: { name: item.name },
      unit_amount: item.price * 100, // Amount in cents
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${order._id}`,
    });

    return res.json({
      success: true,
      msg: "stripe order placed",
      sessionUrl: session.url,
    });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

const verifyStripe = async (req, res) => {
  const { userId, success, orderId } = req.body;

  try {
    if (success) {
      // update payment order to true by its orderId
      // make the user cartData empty by userId

      await Order.findByIdAndUpdate(orderId, { payment: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });

      return res.json({ success: true, msg: "stripe successfully ordered" });
    } else {
      // remove the saved order by its orderId
      await Order.findByIdAndDelete(orderId);
      return res.json({ success: false, msg: "stripe success failed" });
    }
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

export {
  getAllOrders,
  updateOrderStatus,
  getUserOrders,
  placeCodOrder,
  placeStripeOrder,
  verifyStripe,
};
