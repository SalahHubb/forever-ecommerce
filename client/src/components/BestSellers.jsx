import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSellers = () => {
  const { products } = useContext(ShopContext);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);

  useEffect(() => {
    setBestSellerProducts(products.filter((item) => item.bestseller === true));
  }, []);
  return (
    <div>
      {/* header */}
      <div className="flex flex-col items-center space-y-3 my-8">
        <Title text1="BEST" text2="SELLERS" />
        <p className="text-center">
          Lorem ipsum is simply dummy text of the printing and typesetting
          industry. Lorem ipsum has been the.
        </p>
      </div>
      {/* body */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {bestSellerProducts &&
          bestSellerProducts.map((item) => {
            return (
              <ProductItem
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image[0]}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BestSellers;
