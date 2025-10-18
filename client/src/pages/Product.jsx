import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";
import axios from "axios";

const Product = () => {
  const { id } = useParams();
  const { backend_url, currency, addItem } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedImg, setSelectedImg] = useState(0);
  const [size, setSize] = useState("");

  const fetchProduct = async () => {
    try {
      const response = await axios.get(backend_url + "/api/product/single", {
        params: { id },
      });

      if (response.data.success) {
        setProductData(response.data.product);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    setSize("");
  }, [productData]);

  const handleAddToCart = () => {
    if (size) {
      addItem(id, size);
    } else {
      toast.error("Please select a size!");
    }
  };

  if (!productData) {
    return (
      <div className="text-center py-20 text-gray-500">Loading product...</div>
    );
  }

  return (
    <div>
      <hr className="my-8" />
      {/* product-detail */}
      <div className="flex flex-col md:flex-row gap-6 my-10">
        {/* images */}
        <div className="flex flex-col-reverse md:flex-row gap-4 md:max-w-1/2">
          <div className="flex md:flex-col gap-4">
            {productData &&
              productData.images &&
              productData.images.map((img, idx) => {
                return (
                  <img
                    src={img}
                    className="size-14 md:size-22"
                    onClick={() => setSelectedImg(idx)}
                    key={idx}
                  />
                );
              })}
          </div>
          <img
            src={
              productData &&
              productData.images &&
              productData.images[selectedImg]
            }
            className="w-full md:w-2/3"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="font-bold text-2xl">
            {productData && productData.name && productData.name}
          </div>

          <div className="flex gap-1">
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_dull_icon} alt="" />
          </div>

          <div className="font-bold text-2xl">
            {productData && productData.price && currency + productData.price}
          </div>

          <div className="lg:max-w-2/4 text-gray-500">
            {productData && productData.description && productData.description}
          </div>

          <div>
            <p className="font-semibold mb-4">Select Size</p>
            {productData &&
              productData.sizes &&
              productData.sizes.map((sizeItem) => {
                return (
                  <button
                    onClick={() => setSize(sizeItem)}
                    className={`py-2 px-4 bg-gray-100 mr-2 hover:cursor-pointer ${
                      sizeItem == size ? "border-1 border-black" : ""
                    }`}
                    key={sizeItem}
                  >
                    {sizeItem}
                  </button>
                );
              })}
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-black text-white py-2 px-6 self-start"
          >
            ADD TO CART
          </button>

          <hr />

          <div className="text-gray-500">
            100% Original product. <br />
            Cash on delivery is available on this product. <br />
            Easy return and exchange policy within 7 days.
          </div>
        </div>
      </div>

      {/* description-and-review */}
      <div className="my-10">
        <div className="flex">
          <div className="border-1 border-gray-100 py-4 px-6 text-gray-500 font-bold">
            Description
          </div>
          <div className="border-1 border-gray-100 py-4 px-6 text-gray-500 ">
            Reviews(122)
          </div>
        </div>
        <div className="border-1 border-gray-100 py-4 px-6 text-gray-500 ">
          <p className="mb-4">
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      {/* related-products */}
      {productData && productData.category && productData.subCategory && (
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      )}
    </div>
  );
};

export default Product;
