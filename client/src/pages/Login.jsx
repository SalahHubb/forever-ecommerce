import React, { useContext, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backend_url, setToken } = useContext(ShopContext);
  const navigate = useNavigate();

  const [status, setStatus] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // login user
      if (status == "login") {
        const response = await axios.post(backend_url + "/api/user/login", {
          email,
          password,
        });

        if (response.data.success) {
          navigate("/");
          setToken(response.data.token);
          setEmail("");
          setPassword("");
        } else {
          toast.error(response.data.msg);
        }
      } else {
        // register user
        const response = await axios.post(backend_url + "/api/user/register", {
          name,
          email,
          password,
        });

        if (response.data.success) {
          navigate("/");
          setToken(response.data.token);
          setEmail("");
          setName("");
          setPassword("");
          toast.success(response.data.msg);
        } else {
          toast.error(response.data.msg);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center py-18">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 max-w-[400px]"
      >
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`border-1 border-gray-500 rounded-md px-4 py-2 ${
            status == "login" ? "hidden" : "block"
          }`}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-1 border-gray-500 rounded-md px-4 py-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-1 border-gray-500 rounded-md px-4 py-2"
        />
        <div className="flex justify-between">
          <p className="hover:cursor-pointer">Forgot your password?</p>
          <p onClick={() => setStatus(status == "login" ? "sign up" : "login")}>
            {status == "login" ? (
              <p className="hover:cursor-pointer">Create an account</p>
            ) : (
              <p className="hover:cursor-pointer">Login here</p>
            )}
          </p>
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md text-center"
          >
            {status == "login" ? "Sign in" : "Sign up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
