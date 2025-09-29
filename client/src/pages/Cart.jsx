import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotals from "../components/CartTotals";

const Cart = () => {
  const { products, cartItems, currency, updateItemSize, deleteItem } =
    useContext(ShopContext);
  const [items, setItems] = useState([]);
  // items = [{product, size, quantity}]

  useEffect(() => {
    let newItems = [];

    for (const id in cartItems) {
      for (const size in cartItems[id]) {
        newItems.push({
          ["product"]: products.find((product) => product._id == id),
          ["size"]: size,
          ["quantity"]: cartItems[id][size],
        });
      }
    }

    setItems(newItems);
  }, [cartItems]);

  return (
    <div className="border-t pt-8">
      <div className="mb-4">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {items.length == 0 ? (
        <div>Nothing added to the cart till now ..</div>
      ) : (
        items.map((item) => {
          return (
            <div
              className="border-t py-4 flex items-start md:justify-between"
              key={item}
            >
              <div className="flex gap-4">
                <img
                  src={item.product.image[0]}
                  className="w-18 h-22 object-cover"
                />
                <div className="flex flex-col gap-2">
                  <div className="font-semibold text-[13px] md:text-base">
                    {item.product.name}
                  </div>
                  <div className="flex gap-3 items-start">
                    <div>{currency + item.product.price}</div>
                    <div className="bg-gray-200 border-1 px-2 items-start">
                      {item.size}
                    </div>
                  </div>
                </div>
              </div>

              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateItemSize(
                    item.product._id,
                    item.size,
                    parseInt(e.target.value)
                  )
                }
                className="border-1 border-gray-300 self-center max-sm:w-[30px] md:max-w-[100px]"
              />

              <img
                src={assets.bin_icon}
                onClick={() => deleteItem(item.product._id, item.size)}
                className="size-4 self-center ml-4 md:ml-0 md:size-6"
              />
            </div>
          );
        })
      )}

      <div className="mt-10 flex justify-end">
        <CartTotals />
      </div>
    </div>
  );
};

export default Cart;
