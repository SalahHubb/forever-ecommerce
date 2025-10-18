import jwt from "jsonwebtoken";
import "dotenv/config";

const userAuth = async (req, res, next) => {
  const { token } = req.headers;

  try {
    if (!token) {
      return res.json({ success: false, msg: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decoded.id;

    // req.userId = decode.id -> for any http method especially for delete and get which req.body don't always available

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

export default userAuth;
