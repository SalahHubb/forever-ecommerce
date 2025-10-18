import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:justify-between">
        <div>
          <img src={assets.logo} alt="" />
          <p className="mt-4 text-gray-500 text-sm md:max-w-[300px] lg:max-w-[450px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book
          </p>
        </div>

        <div>
          <div className="text-2xl font-bold">COMPANY</div>
          <ul className="mt-4 flex flex-col space-y-2">
            <li className="text-gray-500 text-sm text-left">Home</li>
            <li className="text-gray-500 text-sm text-left">About us</li>
            <li className="text-gray-500 text-sm text-left">Delivery</li>
            <li className="text-gray-500 text-sm text-left">Privacy policy</li>
          </ul>
        </div>

        <div>
          <div className="text-2xl font-bold">GET IN TOUCH</div>
          <p className="text-gray-500 text-sm text-left mt-3">
            +1-000-000-0000
          </p>
          <p className="text-gray-500 text-sm text-left">forever@gmail.com</p>
          <p className="text-gray-500 text-sm text-left">instagram</p>
        </div>
      </div>

      <p className=" h-[1px] border-b w-1/1 my-6 border-gray-500"></p>

      <p className="text-center font-semibold mb-2">
        Copyright 2025. All Right Reserved
      </p>
    </footer>
  );
};

export default Footer;
