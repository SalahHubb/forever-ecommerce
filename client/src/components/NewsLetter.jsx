import React from "react";

const NewsLetter = () => {
  return (
    <div className="flex justify-center mt-8">
      <div className="flex flex-col space-y-4 items-center">
        <div className="text-2xl font-bold text-center">
          Subscribe now & get 20% off
        </div>
        <p className="text-center text-gray-500">
          Lorem ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <form className="self-stretch">
          <input
            type="email"
            placeholder="Enter your email"
            className="border-1 p-2 border-gray-500 w-2/3"
          />
          <button className="bg-black text-white text-center h-1/1 w-1/3">
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
