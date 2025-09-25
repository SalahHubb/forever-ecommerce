import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetter from "../components/NewsLetter";

const Contact = () => {
  return (
    <div>
      <div className="flex justify-center my-10">
        <Title text1={"Contact"} text2={"Us"} />
      </div>

      {/* body */}
      <div className="flex flex-col space-y-6 md:flex-row md:justify-center md:space-x-6 md:space-y-0">
        <img src={assets.contact_img} className="w-full md:max-w-1/3" />
        <div className="flex flex-col space-y-6 items-start justify-center">
          <p className="font-semibold  text-2xl">Our Store</p>

          <div>
            <p>54709 Willms Station</p>
            <p>Suite 350, Washington, USA</p>
          </div>

          <div>
            <p>Tel: (415) 555-0132</p>
            <p>Email: admin@forever.com</p>
          </div>

          <p className="font-semibold text-2xl">Careers at Forever</p>

          <p>Learn more about our teams and job openings.</p>

          <button className="border-1 px-5 py-3">Explore Jobs</button>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default Contact;
