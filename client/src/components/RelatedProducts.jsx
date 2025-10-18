import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState("");

  useEffect(() => {
    setRelatedProducts(
      products
        .filter(
          (item) => item.category == category && item.subCategory == subCategory
        )
        .slice(0, 5)
    );
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <Title text1={"Related"} text2={"Products"} />
      </div>
      {/* body */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        {relatedProducts.length === 0 ? (
          <div>No related products for this item</div>
        ) : (
          relatedProducts.map((item) => {
            return (
              <ProductItem
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.images[0]}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
