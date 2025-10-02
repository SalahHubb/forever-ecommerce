import mongoose from "mongoose";
import "dotenv/config";

const uri = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("connected to mongodb atlas");
  } catch (e) {
    console.log("connection failed: " + e.message);
  }
};

export default connectDB;
