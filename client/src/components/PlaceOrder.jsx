import React, { useState } from "react";
import Title from "./Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotals from "./CartTotals";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [payment, setPayment] = useState("cod");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/orders");
  };

  return (
    <form
      onClick={handleSubmit}
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
              placeholder="First name"
              className="border-1 border-gray-200 rounded-md py-1 px-2 flex-1 min-w-0"
            />
            <input
              type="text"
              name="lastName"
              required
              placeholder="Last name"
              className="border-1 border-gray-200 rounded-md py-1 px-2 flex-1 min-w-0"
            />
          </div>
          <div className="flex">
            <input
              type="email"
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
              placeholder="City"
              className="border-1 border-gray-200 rounded-md py-1 px-2 flex-1 min-w-0"
            />
            <input
              type="text"
              name="state"
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
              placeholder="Zipcode"
              className="border-1 border-gray-200 rounded-md py-1 px-2 flex-1 min-w-0"
            />
            <input
              type="text"
              name="country"
              required
              placeholder="Country"
              className="border-1 border-gray-200 rounded-md py-1 px-2 flex-1 min-w-0"
            />
          </div>

          <div className="flex">
            <input
              type="tel"
              required
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
                  payment == "razor" ? "bg-green-500" : ""
                }`}
                onClick={() => setPayment("razor")}
              ></p>
              <img
                src={assets.razorpay_logo}
                className="w-[73px] h-[15px] object-contain"
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

        <div className="flex justify-end ">
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 mt-4 rounded-md"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
