import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // check if user already exists
  const existing = await User.findOne({ email });
  if (existing) {
    return res.json({ success: false, msg: "user already exist" });
  }

  // check if email and password is valid
  if (password.length < 8) {
    return res.json({
      success: false,
      msg: "please enter a strong password more than 8 characters",
    });
  }
  if (!validator.isEmail(email)) {
    return res.json({ success: false, msg: "Incorrect email format" });
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // register user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  newUser.save();
  const token = jwt.sign({ id: newUser._id }, "userSecretPrivateKey");

  res.json({ success: true, token });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // check if user don't exist
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      success: false,
      msg: "user don't exist with this email",
    });
  }

  // check if password is correct
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.json({ success: false, msg: "Incorrect password" });
  }

  const token = jwt.sign({ id: user._id }, "secretKey");

  res.json({ success: true, token });
};

const loginAdmin = (req, res) => {
  res.json({ msg: "login admin" });
};

export { loginUser, registerUser, loginAdmin };
