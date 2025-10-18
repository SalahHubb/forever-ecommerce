import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = ({ backend_url, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(backend_url + "/api/user/admin", {
        email,
        password,
      });

      if (response.data.success) {
        setEmail("");
        setPassword("");
        setToken(response.data.token);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="lg:w-[350px] bg-white rounded-md shadow-md p-6">
        <div className="text-2xl font-bold mb-4">Admin Panel</div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className=" text-gray-800">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="your@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autocomplete="username"
              className="border-1 border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autocomplete="current-password"
              className="border-1 border-gray-300 rounded-md p-2"
            />
          </div>
          <button className="bg-black text-white rounded-md py-2">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
