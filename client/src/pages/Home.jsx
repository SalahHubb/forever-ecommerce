import React from "react";
import { products } from "../assets/frontend_assets/assets";
import { assets } from "../assets/frontend_assets/assets";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
    </div>
  );
};

export default Home;
