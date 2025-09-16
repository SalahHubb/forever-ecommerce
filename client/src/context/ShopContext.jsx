// create a context variable (which holds an obj of values provided below)
// wrap the parent element in the context provider using the variable
// put the any value u want in the provider value
// so that any child element can access it any where using the context variable

import { createContext } from "react-router-dom";

const ShopContext = createContext();

export default function ShopContextProvider({ children }) {
  return <ShopContext.provider value={values}>{children}</ShopContext.provider>;
}
