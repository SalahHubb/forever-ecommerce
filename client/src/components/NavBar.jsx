import React, { useState } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
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
            onClick={() => {
              setVisible(!visible);
            }}
            alt="cart-icon"
            className="w-[24px] h-[24px] ml-6 md:hidden md:ml-0 cursor-pointer"
          />
        </div>
      </nav>
      {/* mobile menu items */}
      {visible && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-50 pt-4 pl-4">
          <div
            className="font-semibold cursor-pointer"
            onClick={() => setVisible(false)}
          >
            Back
          </div>
          <ul className="mt-4 flex flex-col space-y-2">
            <Link
              to={"/"}
              className="text-lg cursor-pointer"
              onClick={() => setVisible(false)}
            >
              HOME
            </Link>
            <Link
              to={"/collection"}
              className="text-lg cursor-pointer"
              onClick={() => setVisible(false)}
            >
              COLLECTION
            </Link>
            <Link
              to={"/about"}
              className="text-lg cursor-pointer"
              onClick={() => setVisible(false)}
            >
              ABOUT
            </Link>
            <Link
              to={"/contact"}
              className="text-lg cursor-pointer"
              onClick={() => setVisible(false)}
            >
              CONTACT
            </Link>
            <Link
              to={"/adminPanel"}
              className="text-lg cursor-pointer"
              onClick={() => setVisible(false)}
            >
              ADMIN PANEL
            </Link>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavBar;
