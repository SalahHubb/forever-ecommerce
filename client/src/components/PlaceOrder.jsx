import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotals from "./CartTotals";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const {
    token,
    backend_url,
    setCartItems,
    cartItems,
    products,
    getCartItemsTotal,
    delivery_fee,
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const [payment, setPayment] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // cartItems = { id: {s: 1, lg: 3} }
    // items = [{id, size: s, quantity: 1}, {id, size: s, quantity: 3}]
    const items = [];

    for (const id in cartItems) {
      for (const size in cartItems[id]) {
        let item = products.find((product) => product._id == id);

        item["size"] = size;
        item["quantity"] = cartItems[id][size];

        items.push(item);
      }
    }

    const amount = getCartItemsTotal() + delivery_fee;

    switch (payment) {
      case "cod":
        const response = await axios.post(
          backend_url + "/api/order/cod",
          { items, amount, address: formData },
          { headers: { token } }
        );

        if (response.data.success) {
          await axios.post(
            backend_url + "/api/cart/clear",
            {},
            { headers: { token } }
          );
          setCartItems({});
          toast.success(response.data.msg);
          navigate("/orders");
        } else {
          toast.error(response.data.msg);
        }
        break;

      case "stripe":
        try {
          const sessionResponse = await axios.post(
            backend_url + "/api/order/stripe",
            { items, amount, address: formData },
            { headers: { token } }
          );

          if (sessionResponse.data.success) {
            window.location.replace(sessionResponse.data.sessionUrl);
          }
        } catch (error) {
          console.log(error.message);
        }

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("please login to place an order");
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) return null;

  return (
    <form
      onSubmit={handlePlaceOrder}
      className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:justify-between md:gap-17 border-t pt-4 md:pt-8"
    >
      <div className="w-full md:max-w-[40%]">
        <Title text1={"DELIVERY"} text2={"INFORMATION"} />

        {/* input fields */}
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              required
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="border-1 border-gray-200 rounded-md py-1 px-2 flex-1 min-w-0"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Last name"
              className="border-1 border-gray-200 rounded-md py-1 px-2 flex-1 min-w-0"
            />
          </div>
          <div className="flex">
            <input
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              name="email"
              placeholder="Email address"
              className="border-1 border-gray-200 rounded-md py-1 px-2 flex-1"
            />
          </div>
          <div className="flex">
            <input
              type="text"
              required
              value={formData.street}
              onChange={handleChange}
              name="street"
              placeholder="Street"
              className="border-1 border-gray-200 rounded-md py-1 px-2 flex-1"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              required
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="border-1 border-gray-200 rounded-md py-1 px-2 flex-1 min-w-0"
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              placeholder="State"
              className="border-1 border-gray-200 rounded-md flex-1 py-1 px-2 min-w-0"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              required
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              placeholder="Zipcode"
              className="border-1 border-gray-200 rounded-md py-1 px-2 flex-1 min-w-0"
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              placeholder="Country"
              className="border-1 border-gray-200 rounded-md py-1 px-2 flex-1 min-w-0"
            />
          </div>

          <div className="flex">
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              name="phone"
              placeholder="Phone"
              className="border-1 border-gray-200 rounded-md py-1 px-2 flex-1"
            />
          </div>
        </div>
      </div>

      <div className="w-full md:max-w-[485px]">
        <CartTotals />

        <div className="flex flex-col">
          <div className="my-6">
            <Title text1={"Payment"} text2={"Methods"} />
          </div>

          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="border-1 border-gray-300 flex items-center gap-4 px-4 py-2 rounded-md">
              <p
                className={`min-w-3 h-3  border-1 border-gray-200 rounded-full ${
                  payment == "stripe" ? "bg-green-500" : ""
                }`}
                onClick={() => setPayment("stripe")}
              ></p>
              <img
                src={assets.stripe_logo}
                className="w-[43px] h-[19px] object-contain"
              />
            </div>

            <div className="border-1 border-gray-300 flex items-center gap-4 px-4 py-2 rounded-md">
              <p
                className={`min-w-3 h-3 rounded-full border-1 border-gray-200 ${
                  payment == "cod" ? "bg-green-500" : ""
                }`}
                onClick={() => setPayment("cod")}
              ></p>
              <p className="text-gray-500 ">CASH ON DELIVERY</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 mt-6 rounded-md"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
