import React, { useContext } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";

const CartTotals = () => {
  const { getCartItemsTotal, currency, delivery_fee } = useContext(ShopContext);
  return (
    <div className="w-full md:w-[250px] lg:w-[400px]">
      <Title text1={"CART"} text2={"TOTALS"} />
      <div className="flex justify-between pt-4">
        <p>Subtotal</p>
        <p>{`${currency}${getCartItemsTotal()}.00`}</p>
      </div>
      <hr className="my-2 bg-gray-500" />
      <div className="flex justify-between">
        <p>Shipping Fee</p>
        <p>{`${currency}${delivery_fee}.00`}</p>
      </div>
      <hr className="my-2 bg-gray-500" />
      <div className="flex justify-between">
        <p className="font-semibold">Total</p>
        <p className="font-semibold">
          {`${currency}${getCartItemsTotal() + delivery_fee}.00`}
        </p>
      </div>

      <div className="flex justify-end">
        <button className="bg-black text-white py-2 px-4 mt-4">
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartTotals;
