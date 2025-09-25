import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ id, name, price, image }) => {
  const { currency } = useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <div key={id} onClick={() => navigate(`/product/${id}`)}>
      <img src={image} className="w-full" />
      <p className="py-2">{name}</p>
      <p>{price + currency}</p>
    </div>
  );
};

export default ProductItem;
