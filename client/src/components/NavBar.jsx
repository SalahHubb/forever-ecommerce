import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const { getCartItemsCount, token, setToken } = useContext(ShopContext);
  const navigate = useNavigate();

  const adminPanelUrl = import.meta.env.VITE_ADMIN_PANEL_URL;

  const navigateToAdminPanel = () => {
    window.open(adminPanelUrl, "_blank", "noopener,noreferrer");
  };

  const handleLogout = () => {
    setToken("");
    navigate("/login");
  };

  return (
    <>
      <nav className="flex justify-between items-center relative">
        <img
          src={assets.logo}
          alt="logo"
          className="w-[100px] md:w-[166px] md:h-[47px]"
        />
        <ul className="hidden md:flex md:items-center space-x-6">
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
          <div
            className="border-1 border-gray-300
           rounded-md p-1 mr-2 lg:px-2 lg:py-1"
            onClick={navigateToAdminPanel}
          >
            Admin Panel
          </div>
        </ul>

        <div className="flex">
          <div className="flex space-x-6">
            <img
              src={assets.search_icon}
              alt="search-icon"
              className="w-[24px] h-[24px] hover:cursor-pointer"
            />

            <div className="group relative">
              <div onClick={() => (token ? null : navigate("/login"))}>
                <img
                  src={assets.profile_icon}
                  alt="profile-icon"
                  className="w-[24px] h-[24px]"
                />
              </div>
              {/* dropdown */}
              {token ? (
                <div className="hidden group-hover:block   absolute pt-6 right-0">
                  <div className="bg-blue-100 w-[120px] p-4">
                    <p className="cursor-pointer hover:underline">My profile</p>
                    <p className="cursor-pointer hover:underline my-2">
                      Orders
                    </p>
                    <p
                      onClick={() => handleLogout()}
                      className="cursor-pointer hover:underline"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="relative" onClick={() => navigate("/cart")}>
              <img
                src={assets.cart_icon}
                alt="cart-icon"
                className="w-[24px] h-[24px] hover:cursor-pointer"
              />
              <span className="absolute left-3 top-3 size-[18px] bg-black rounded-full text-white flex justify-center items-center text-[13px]">
                {getCartItemsCount()}
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

            <div
              onClick={() => {
                setVisible(false);
                navigateToAdminPanel;
              }}
              className="text-lg cursor-pointer"
            >
              ADMIN PANEL
            </div>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavBar;
