import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className=" text-lg text-gray-500 md:text-3xl lg:text-4xl ">
        {text1}
      </div>
      <div className=" text-lg font-semibold text-black md:text-3xl lg:text-4xl ">
        {text2}
      </div>
      <hr className="w-6" />
    </div>
  );
};

export default Title;
