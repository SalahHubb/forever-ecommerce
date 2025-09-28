import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext(null);

// cartItems [{id: {s: 1, lg: 3}}]

export default function ShopContextProvider({ children }) {
  const [cartItems, setCartItems] = useState({});

  const addItem = (id, size) => {
    // size should be selected

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

  // const updateItemSize = (id, size, count) => {
  //   const cpyCartItems = structuredClone(cartItems);
  //   cpyCartItems[id][size] = count;
  //   setCartItems(cpyCartItems);
  // };

  // const deleteItem = (id, size) => {
  //   const cpyCartItems = structuredClone(cartItems);
  //   cpyCartItems[id][size] = 0;
  //   setCartItems(cpyCartItems);
  // };

  const getCartItemsCount = () => {
    let count = 0;

    for (const item in cartItems) {
      for (const key in cartItems[item]) {
        count += cartItems[item][key];
      }
    }

    return count;
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
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return <ShopContext.Provider value={values}>{children}</ShopContext.Provider>;
}
