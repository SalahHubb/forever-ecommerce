import cloudinary from "../config/cloudinary.js";
import Product from "../models/productSchema.js";

const addProduct = async (req, res) => {
  const { name, description, category, subCategory, price, sizes, bestSeller } =
    req.body;
  const files = req.files;

  try {
    if (!files) {
      return res.json({ success: false, msg: "No image uploaded" });
    }

    const imageUrls = [];
    for (const img in files) {
      const result = await cloudinary.uploader.upload(files[img][0].path);
      imageUrls.push(result.secure_url);
    }

    const newProduct = new Product({
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      sizes: JSON.parse(sizes),
      images: imageUrls,
      bestSeller: bestSeller == "true" ? true : false,
    });

    const product = await newProduct.save();

    res.json({ success: true, msg: "product is added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: e.message });
  }
};

const removeProduct = async (req, res) => {
  const { id } = req.body;

  try {
    await Product.findByIdAndDelete(id);
    res.json({ success: true, msg: "product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: e.message });
  }
};

const singleProduct = async (req, res) => {
  const { id } = req.body;

  try {
    const product = await Product.findById(id);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: e.message });
  }
};

const listProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "error occurred" + e.message });
  }
};

export { addProduct, removeProduct, singleProduct, listProduct };
