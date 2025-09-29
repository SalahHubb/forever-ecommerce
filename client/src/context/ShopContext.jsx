import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext(null);

// cartItems = {{id: {s: 1, lg: 3}}}

export default function ShopContextProvider({ children }) {
  const [cartItems, setCartItems] = useState({});

  const addItem = (id, size) => {
    let cpyCartItems = structuredClone(cartItems);
    const existing = cpyCartItems[id];

    if (existing) {
      if (cpyCartItems[id][size]) {
        cpyCartItems[id][size] += 1;
      } else {
        cpyCartItems[id][size] = 1;
      }
    } else {
      cpyCartItems[id] = { [size]: 1 };
    }

    setCartItems(cpyCartItems);
  };

  const updateItemSize = (id, size, count) => {
    const cpyCartItems = structuredClone(cartItems);
    cpyCartItems[id][size] = count;
    setCartItems(cpyCartItems);
  };

  const deleteItem = (id, size) => {
    const cpyCartItems = structuredClone(cartItems);
    delete cpyCartItems[id][size];
    setCartItems(cpyCartItems);
  };

  const getCartItemsCount = () => {
    let count = 0;

    for (const item in cartItems) {
      for (const key in cartItems[item]) {
        count += cartItems[item][key];
      }
    }

    return count;
  };

  const getCartItemsTotal = () => {
    let total = 0;

    for (const id in cartItems) {
      for (const size in cartItems[id]) {
        total +=
          cartItems[id][size] *
          products.find((product) => product._id == id).price;
      }
    }

    return total;
  };

  const currency = "$";
  const delivery_fee = 10;

  const values = {
    products,
    currency,
    delivery_fee,
    cartItems,
    addItem,
    deleteItem,
    updateItemSize,
    getCartItemsCount,
    getCartItemsTotal,
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return <ShopContext.Provider value={values}>{children}</ShopContext.Provider>;
}
