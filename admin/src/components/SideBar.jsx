import React from "react";
import { assets } from "../assets/admin_assets/assets";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-[20%] inline-block pt-6 align-top">
      <NavLink
        to={"/add"}
        className="border-1 border-gray-300 p-2 flex gap-2 items-center mb-4 rounded-md rounded-br-none rounded-tr-none"
      >
        <img src={assets.add_icon} className="w-6 md:w-8" />
        <p className="font-semibold hidden md:block">Add items</p>
      </NavLink>
      <NavLink
        to={"/list"}
        className="border-1 border-gray-300 p-2 rounded-md flex gap-2 items-center mb-4 rounded-br-none rounded-tr-none"
      >
        <img src={assets.parcel_icon} className="w-6 md:w-8" />
        <p className="font-semibold hidden md:block">List items</p>
      </NavLink>
      <NavLink
        to={"/orders"}
        className="border-1 border-gray-300 p-2 rounded-md flex gap-2 items-center mb-4 rounded-br-none rounded-tr-none"
      >
        <img src={assets.order_icon} className="w-6 md:w-8" />
        <p className="font-semibold hidden md:block">Orders</p>
      </NavLink>
    </div>
  );
};

export default SideBar;
