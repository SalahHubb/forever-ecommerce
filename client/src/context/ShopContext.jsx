import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext(null);

// cart items format
// cartItems = { id: {s: 1, lg: 3} }

export default function ShopContextProvider({ children }) {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const currency = "$";
  const delivery_fee = 10;
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // save token change to localStorage
    localStorage.setItem("token", token);

    // if user is logged in fetch its cart items
    if (token) {
      getCartItems();
    } else {
      setCartItems({});
      // remove from user cartItems
    }
  }, [token]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(backend_url + "/api/product/list");

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCartItems = async () => {
    try {
      const response = await axios.post(
        backend_url + "/api/cart/get",
        {},
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addItem = async (productId, size) => {
    // add to cartItems as guest
    let items = structuredClone(cartItems);

    const exist = items[productId];
    if (exist) {
      items[productId][size] = (items[productId][size] || 0) + 1;
    } else {
      items[productId] = { [size]: 1 };
    }

    setCartItems(items);

    // if user is logged in save cartItems to db
    if (token) {
      try {
        const response = await axios.post(
          backend_url + "/api/cart/add",
          { productId, size },
          { headers: { token } }
        );

        if (response.data.success) {
          setCartItems(response.data.cartData);
        } else {
          toast.error(response.data.msg);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const updateItemSize = async (productId, size, quantity) => {
    // update cartItems
    let items = structuredClone(cartItems);
    items[productId][size] = quantity;

    setCartItems(items);

    // if user is logged in save cartItem update in db
    if (token) {
      try {
        const response = await axios.put(
          backend_url + "/api/cart/update",
          { productId, size, quantity },
          { headers: { token } }
        );

        if (response.data.success) {
          setCartItems(response.data.cartData);
        } else {
          toast.error(response.data.msg);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const deleteItem = async (productId, size) => {
    let items = structuredClone(cartItems);
    delete items[productId][size];
    setCartItems(items);

    // if user is logged in save change in db
    if (token) {
      try {
        const response = await axios.delete(backend_url + "/api/cart/delete", {
          data: { productId, size },
          headers: { token },
        });

        if (response.data.success) {
          setCartItems(response.data.cartData);
        } else {
          toast.error(response.data.msg);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
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

    if (products.length > 0) {
      for (const id in cartItems) {
        for (const size in cartItems[id]) {
          total +=
            cartItems[id][size] *
            products.find((product) => product._id == id).price;
        }
      }
    }

    return total;
  };

  const values = {
    products,
    currency,
    delivery_fee,
    backend_url,
    token,
    setToken,
    cartItems,
    setCartItems,
    addItem,
    deleteItem,
    updateItemSize,
    getCartItemsCount,
    getCartItemsTotal,
  };

  return <ShopContext.Provider value={values}>{children}</ShopContext.Provider>;
}
