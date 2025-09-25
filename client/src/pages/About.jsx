import React from "react";
import Title from "../components/Title";
import NewsLetter from "../components/NewsLetter";
import { assets } from "../assets/frontend_assets/assets";

const About = () => {
  return (
    <div>
      <div className="flex justify-center my-8">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      {/* top-section */}
      <div className="flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} className="md:max-w-1/3 md:self-start" />
        <div className="flex flex-col space-y-6 ">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers
          </p>
          <h3 className="font-bold">Our Mission</h3>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>

      {/* bottom-section */}
      <div>
        <div className="my-8">
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 border-1 border-gray-500 px-8 py-16">
            <p className="font-semibold mb-3">Quality Assurance</p>
            <p className="text-left">
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards.
            </p>
          </div>
          <div className="flex-1 border-1 border-gray-500 px-8 py-16">
            <p className="font-semibold mb-3">Convenience</p>
            <p className="text-left">
              With our user friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </p>
          </div>
          <div className="flex-1 border-1 border-gray-500 px-8 py-16">
            <p className="font-semibold mb-3">Exceptional Customer Service:</p>
            <p className="text-left">
              Our team of dedicated professionals is here to assist you the way,
              ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default About;
