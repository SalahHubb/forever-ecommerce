import React from "react";
import { assets } from "../assets/admin_assets/assets";

const NavBar = ({ setToken }) => {
  return (
    <div className="container mx-auto p-6 flex justify-between items-center">
      <img src={assets.logo} className="w-32" />
      <button
        onClick={() => setToken("")}
        className="bg-blue-950 px-4 py-2 rounded-md text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
