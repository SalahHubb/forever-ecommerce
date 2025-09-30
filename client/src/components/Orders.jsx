import React, { useContext } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  const { products } = useContext(ShopContext);

  return (
    <div className="border-t border-gray-500 pt-8 mt-4">
      <div className="border-b border-gray-500 pb-4">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {products.slice(0, 4).map((product) => {
        return (
          <div className="py-4 border-b flex flex-col gap-4 md:flex-row">
            <div className="w-full md:flex-1 flex gap-4">
              <img
                src={product.image[0]}
                alt=""
                className="w-20 object-cover"
              />
              <div className="flex flex-col gap-2">
                <p className="font-semibold">{product.name}</p>
                <p className="flex gap-2">
                  <p>price: {product.price}</p>
                  <p>Quantity: 1</p>
                  <p>Size: L</p>
                </p>
                <p>Date:</p>
                <p>Payment:</p>
              </div>
            </div>

            <div className="w-full md:flex-1 flex justify-between items-center">
              <p className="flex gap-1 items-center">
                <p className="w-3 h-3 min-w-3 border-1 border-gray-300 rounded-full bg-green-400 mr-1"></p>{" "}
                <p>Order placed</p>
              </p>
              <p className="border-1 border-gray-500 px-4 py-2 rounded-md">
                Track order
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
