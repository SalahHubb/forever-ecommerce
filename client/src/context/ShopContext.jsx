// create a context variable (which holds an obj of values provided below)
// wrap the parent element in the context provider using the variable
// put the any value u want in the provider value
// so that any child element can access it any where using the context variable

import { createContext } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext(null);

export default function ShopContextProvider({ children }) {
  const currency = "$";
  const delivery_fee = 10;

  const values = {
    products,
    currency,
    delivery_fee,
  };

  return <ShopContext.Provider value={values}>{children}</ShopContext.Provider>;
}
