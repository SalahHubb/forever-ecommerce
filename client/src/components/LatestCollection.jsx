import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, []);

  return (
    <div>
      {/* header */}
      <div className="flex flex-col items-center space-y-3 my-8">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="text-center">
          Lorem ipsum is simply dummy text of the printing and typesetting
          industry. Lorem ipsum has been the.
        </p>
      </div>
      {/* body */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {latestProducts &&
          latestProducts.map((item) => {
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

export default LatestCollection;
