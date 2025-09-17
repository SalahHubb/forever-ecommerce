import React from "react";
import homeImage from "../assets/frontend_assets/p_img14.png";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border-1 border-[#ADADAD] mt-6">
      {/* left section */}
      <div className=" flex flex-col justify-center space-y-4 pl-[49px] py-12 sm:flex-1">
        <div className="flex items-center gap-2">
          <hr className="w-6" />
          <p className="text-lg font-semibold">OUR BESTSELLERS</p>
        </div>
        <h1 className="font-bold text-4xl lg:text-5xl">Latest Arrivals</h1>
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold">SHOP NOW</p>
          <hr className="w-6" />
        </div>
      </div>
      {/* Right section */}
      <div className="sm:flex-1">
        <img
          src={homeImage}
          className="w-full max-h-[470px] sm:max-h-[600px]"
        />
      </div>
    </div>
  );
};

export default Hero;
