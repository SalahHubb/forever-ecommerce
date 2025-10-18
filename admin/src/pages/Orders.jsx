import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets.js";

// orders = [{p1, size: s, quantity: 2}, {p1, size: lg , quantity: 1}]

const Orders = ({ token, backend_url, currency }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (orderId, currentStatus) => {
    try {
      const response = await axios.put(
        backend_url + "/api/order/update",
        { orderId, currentStatus },
        { headers: { token } }
      );

      if (response.data.success) {
        fetchOrders();
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(loading);
      const response = await axios.get(backend_url + "/api/order/list", {
        data: {},
        headers: { token },
      });

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.msg);
      }

      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="mt-20 text-center text-lg">Loading...</div>;
  }

  return (
    <div>
      <h2>Order Page</h2>
      {orders.length > 0 &&
        orders.map((order) => {
          return (
            <div className="grid place-items-start md:grid-cols-[1fr_3fr_2fr] lg:grid-cols-[0.5fr_2fr_1fr_0.5fr_1fr] my-2 border-1 border-gray-300 p-4">
              <img src={assets.parcel_icon} className="w-12" />

              <div className="my-2 md:my-0">
                <div>
                  {order.items.map((item) => {
                    return (
                      <p>{item.name + " X " + item.quantity + item.size}</p>
                    );
                  })}
                </div>
                <div className="mt-2">
                  <p className="my-2">
                    {order.address.firstName + ", " + order.address.lastName}
                  </p>
                  <p>
                    {order.address.country +
                      ", " +
                      order.address.city +
                      ", " +
                      order.address.state}
                  </p>
                </div>
              </div>

              <div className="my-2 md:my-0">
                <p className="mb-2">Items: {order.items.length}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Payment: pending</p>
                <p>Date: {new Date(order.date).toDateString()}</p>
              </div>

              <div className="my-2 md:my-0">{currency + order.amount}</div>

              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
              >
                <option value="Order placed">Order placed</option>
                <option value="Packing">Packing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="shipped">shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
    </div>
  );
};

export default Orders;
