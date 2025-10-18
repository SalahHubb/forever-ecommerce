import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const currency = "$";
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <>
      <ToastContainer />
      {token ? (
        <div className="bg-gray-100 min-h-screen">
          <NavBar setToken={setToken} />
          <hr className="text-gray-300" />
          <div className="container mx-auto px-6">
            <SideBar />
            <div className="w-[80%] inline-block border-l border-gray-300 p-2 md:pt-6 md:px-8">
              <Routes>
                <Route
                  path="/add"
                  element={<Add backend_url={backend_url} token={token} />}
                />
                <Route
                  path="/list"
                  element={
                    <List
                      backend_url={backend_url}
                      currency={currency}
                      token={token}
                    />
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <Orders
                      token={token}
                      backend_url={backend_url}
                      currency={currency}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Login backend_url={backend_url} setToken={setToken} />
      )}
    </>
  );
};

export default App;
