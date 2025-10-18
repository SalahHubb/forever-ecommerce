import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const List = ({ backend_url, currency, token }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(backend_url + "/api/product/list");

      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRemoveProduct = async (id) => {
    try {
      const response = await axios.post(
        backend_url + "/api/product/remove",
        {
          id,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.msg);
        await fetchProducts();
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <p className="mb-2"> All products list</p>

      <div className="hidden md:grid rounded-md p-2 bg-gray-200 grid-cols-[1fr_3fr_1fr_1fr_1fr] place-items-center">
        <p className="text-black font-semibold ">Image</p>
        <p className="text-black font-semibold ">Name</p>
        <p className="text-black font-semibold ">Category</p>
        <p className="text-black font-semibold ">Price</p>
        <p className="text-black font-semibold">Action</p>
      </div>

      {products.length > 0 &&
        products.map((product) => {
          return (
            <div className="my-2 border-1 border-gray-300 rounded-md">
              <div className="grid grid-cols-[1fr_2fr_1fr] gap-x-1 md:gap-x-0 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] place-items-center  ">
                <img src={product.images[0]} className="w-10 md:w-12" />
                <div>{product.name}</div>
                <div>{product.category}</div>
                <div className="hidden md:block">
                  {currency + product.price}
                </div>
                <button
                  className="hidden md:block bg-none border-none"
                  onClick={() => handleRemoveProduct(product._id)}
                >
                  X
                </button>
              </div>
              <div className="w-full flex justify-between px-10 my-2 md:hidden">
                <div>{currency + product.price}</div>
                <button
                  className="border-none bg-inherit"
                  onClick={() => handleRemoveProduct(product._id)}
                >
                  X
                </button>
              </div>
            </div>
          );
        })}

      {/* <table className="w-full border-separate border-spacing-y-2">
        <thead className="rounded-md bg-gray-200 hidden md:table-header-group">
          <tr>
            <th className="text-black font-semibold" id="img">
              Image
            </th>
            <th className="text-black font-semibold">Name</th>
            <th className="text-black font-semibold">Category</th>
            <th className="text-black font-semibold">Price</th>
            <th className="text-black font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 &&
            products.map((product) => {
              return (
                <tr>
                  <td className="border-t border-b border-l rounded-l-md border-gray-300">
                    <img src={product.images[0]} className="w-10" />
                  </td>
                  <td className="border-t border-b border-gray-300 ">
                    {product.name}
                  </td>
                  <td className="border-t border-b border-gray-300 ">
                    {product.category}
                  </td>
                  <td className="border-t border-b border-gray-300 ">
                    {product.price}
                  </td>
                  <td className="border-t border-b border-r rounded-r-md border-gray-300 ">
                    <button onClick={() => handleRemoveProduct(product._id)}>
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table> */}

      {/* <div className="hidden  md:flex">
        <p className="text-black font-semibold flex-1">Image</p>
        <p className="text-black font-semibold text-center flex-2">Name</p>
        <p className="text-black font-semibold flex-1">Category</p>
        <p className="text-black font-semibold text-center flex-1">Price</p>
        <p className="text-black font-semibold flex-1">Action</p>
      </div> */}

      {/* {products.length > 0 &&
        products.map((product) => {
          return (
            <div className="flex ">
              <img src={product.images[0]} className="w-10" />
              <div className="text-center flex-2">{product.name}</div>
              <div className="text-center flex-1">{product.category}</div>
              <div className="text-center flex-1">{product.price}</div>
              <div className="text-center flex-1">X</div>
            </div>
          );
        })} */}
    </div>
  );
};

export default List;
