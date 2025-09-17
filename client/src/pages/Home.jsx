import React from "react";
import { products } from "../assets/frontend_assets/assets";
import { assets } from "../assets/frontend_assets/assets";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSellers from "../components/BestSellers";
import Policies from "../components/Policies";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSellers />
      <Policies />
    </div>
  );
};

export default Home;
