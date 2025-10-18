import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const StripeVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { token, backend_url, setCartItems } = useContext(ShopContext);

  const verifyStripe = async () => {
    try {
      const response = await axios.post(
        backend_url + "/api/order/stripeVerify",
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        toast.error(response.data.msg);
        navigate("/place-order");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      verifyStripe();
    }
  }, [token]);

  return <div></div>;
};

export default StripeVerification;
