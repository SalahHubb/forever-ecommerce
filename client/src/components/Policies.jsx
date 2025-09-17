import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Policies = () => {
  return (
    <div className=" mt-10 flex flex-col items-center space-y-10 md:flex-row md:justify-around md:space-y-0">
      <div className="flex flex-col items-center">
        <img src={assets.exchange_icon} alt="" />
        <p className="mt-4 font-semibold">Easy Exchange Policy</p>
        <p className="text-center text-gray-500">
          We offer hassle free exchange policy
        </p>
      </div>

      <div className="flex flex-col items-center">
        <img src={assets.quality_icon} alt="" />
        <p className="mt-4 font-semibold">7 Days Return Policy</p>
        <p className="text-center text-gray-500">
          We offer hassle free exchange policy
        </p>
      </div>

      <div className="flex flex-col items-center">
        <img src={assets.support_img} className="justify-self-start" />
        <p className="mt-4 font-semibold">Best Customer Support</p>
        <p className="text-center text-gray-500">
          We offer hassle free exchange policy
        </p>
      </div>
    </div>
  );
};

export default Policies;
