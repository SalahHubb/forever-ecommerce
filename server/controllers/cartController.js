import User from "../models/userSchema.js";

// user = {..., cartData: {...}}

const getUserCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    return res.json({ success: true, cartData: user.cartData });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

const addItem = async (req, res) => {
  const { userId, productId, size } = req.body;

  try {
    const user = await User.findById(userId);

    let cartData = await user.cartData;

    if (cartData[productId]) {
      cartData[productId][size] = (cartData[productId][size] || 0) + 1;
    } else {
      cartData[productId] = { [size]: 1 };
    }

    await User.findByIdAndUpdate(userId, { cartData });

    return res.json({ success: true, msg: "added to cart", cartData });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

const updateItemSize = async (req, res) => {
  const { userId, productId, size, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    let cartData = user.cartData;

    cartData[productId][size] = quantity;

    await User.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, msg: "product quantity updated", cartData });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

const deleteItem = async (req, res) => {
  const { userId, productId, size } = req.body;

  try {
    const user = await User.findById(userId);
    let cartData = user.cartData;

    delete cartData[productId][size];

    await User.findByIdAndUpdate(userId, { cartData });

    return res.json({
      success: true,
      msg: "item deleted successfully",
      cartData,
    });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

const clearCart = async (req, res) => {
  const { userId } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { cartData: {} });
    return res.json({ success: true, msg: "Cart cleared" });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

export { addItem, updateItemSize, deleteItem, getUserCart, clearCart };
