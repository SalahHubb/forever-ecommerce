import jwt from "jsonwebtoken";
import "dotenv/config";

const adminAuth = async (req, res, next) => {
  const { token } = req.headers;

  try {
    if (!token) {
      return res.json({ success: false, msg: "Not Authorized login again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // check if the role is not admin
    if (decoded.role !== "admin") {
      return res.json({ success: false, msg: "Not Authorized login again" });
    }

    next();
  } catch (e) {
    console.log(e);
    res.json({ success: false, msg: e.message });
  }
};

export default adminAuth;
