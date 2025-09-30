import React, { useState } from "react";
import Title from "../components/Title";

const Login = () => {
  const [status, setStatus] = useState("login");

  return (
    <div className="flex justify-center items-center py-18">
      <div className="w-full flex flex-col gap-4 max-w-[400px]">
        <div className="flex justify-center">
          {status == "sign up" ? (
            <Title text1={"Sign"} text2={"Up"} />
          ) : (
            <Title text1={"Login"} text2={""} />
          )}
        </div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className={`border-1 border-gray-500 rounded-sm px-4 py-2 ${
            status == "login" ? "hidden" : "block"
          }`}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border-1 border-gray-500 rounded-sm px-4 py-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border-1 border-gray-500 rounded-sm px-4 py-2"
        />
        <div className="flex justify-between">
          <p>Forgot your password?</p>
          <p onClick={() => setStatus(status == "login" ? "sign up" : "login")}>
            {status == "login" ? <p>Create an account</p> : <p>Login here</p>}
          </p>
        </div>

        <div className="flex justify-center mt-4">
          <button className="bg-black text-white px-4 py-2 rounded-md text-center">
            {status == "login" ? "Sign in" : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
