import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, name, price, image }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div key={id}>
      <img src={image} className="w-full" />
      <p className="py-2">{name}</p>
      <p>{price + currency}</p>
    </div>
  );
};

export default ProductItem;
