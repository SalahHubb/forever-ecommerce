import React from "react";
import { products } from "../assets/frontend_assets/assets";
import { assets } from "../assets/frontend_assets/assets";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSellers from "../components/BestSellers";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSellers />
    </div>
  );
};

export default Home;
