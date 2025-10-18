import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { backend_url, token } = useContext(ShopContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        backend_url + "/api/order/userOrder",
        {},
        { headers: { token } }
      );

      console.log(response);

      if (response.data.success) {
        setLoading(false);
        setOrder(response.data.userOrder);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const handleTrackOrder = () => {
    fetchUserOrders();
  };

  if (loading) {
    return <div className="my-10 text-center text-lg">Loading...</div>;
  }

  return (
    <div className="border-t border-gray-500 pt-8 mt-4">
      <div className="border-b border-gray-500 pb-4">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {order &&
        order.items.map((product, idx) => {
          return (
            <div
              key={idx}
              className="py-4 border-b flex flex-col gap-4 md:flex-row"
            >
              <div className="w-full md:flex-1 flex gap-4">
                <img
                  src={product.images[0]}
                  alt=""
                  className="w-20 object-cover"
                />
                <div className="flex flex-col gap-2">
                  <p className="font-semibold">{product.name}</p>
                  <p className="flex gap-2">
                    <p>price: {product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Size: {product.size}</p>
                  </p>
                  <p>Date:{new Date(Date.now()).toLocaleDateString()}</p>
                  <p>Payment :{" " + order.paymentMethod}</p>
                </div>
              </div>

              <div className="w-full md:flex-1 flex justify-between items-center">
                <p className="flex gap-1 items-center">
                  <p className="w-3 h-3 min-w-3 border-1 border-gray-300 rounded-full bg-green-400 mr-1"></p>{" "}
                  <p>{order.status}</p>
                </p>
                <p
                  onClick={handleTrackOrder}
                  className="border-1 border-gray-500 px-4 py-2 rounded-md"
                >
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
