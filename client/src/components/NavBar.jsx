import React from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center">
      <img
        src={assets.logo}
        alt="logo"
        className="w-[100px] md:w-[166px] md:h-[47px]"
      />
      <ul className="hidden md:flex space-x-6">
        <NavLink to="/">
          <p className=" font-medium font-Outfit">HOME</p>
          <hr className="w-2/3 mx-auto hidden" />
        </NavLink>
        <NavLink to="/collection">
          <p className=" font-medium font-Outfit">COLLECTION</p>
          <hr className="w-2/3 mx-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <p className=" font-medium font-Outfit">ABOUT</p>
          <hr className="w-2/3 mx-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <p className=" font-medium font-Outfit">CONTACT</p>
          <hr className="w-2/3 mx-auto hidden" />
        </NavLink>
      </ul>

      <div className="flex">
        <div className="flex space-x-6">
          <img
            src={assets.search_icon}
            alt="search-icon"
            className="w-[24px] h-[24px] hover:cursor-pointer"
          />
          <img
            src={assets.profile_icon}
            alt="profile-icon"
            className="w-[24px] h-[24px] hover:cursor-pointer"
          />
          <div className="relative">
            <img
              src={assets.cart_icon}
              alt="cart-icon"
              className="w-[24px] h-[24px] hover:cursor-pointer"
            />
            <span className="absolute left-3 top-3 size-[18px] bg-black rounded-full text-white flex justify-center items-center text-[13px]">
              2
            </span>
          </div>
        </div>

        <img
          src={assets.menu_icon}
          alt="cart-icon"
          className="w-[24px] h-[24px] ml-6 md:hidden md:ml-0"
        />
      </div>
    </nav>
  );
};

export default NavBar;
