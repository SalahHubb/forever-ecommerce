import React, { use, useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ backend_url, token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);

  const handleSizes = (size) => {
    const newSizes = sizes.includes(size)
      ? sizes.filter((sz) => sz !== size)
      : [...sizes, size];

    setSizes(newSizes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if any size is not chosen
    if (sizes.length == 0) {
      return toast.error("please select size(s)");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("bestSeller", bestSeller);

    image1 && formData.append("image1", image1);
    image2 && formData.append("image2", image2);
    image3 && formData.append("image3", image3);
    image4 && formData.append("image4", image4);

    try {
      const response = await axios.post(
        backend_url + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.msg);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setSizes([]);
        setBestSeller(false);
        setImage1("");
        setImage2("");
        setImage3("");
        setImage4("");
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p className="mb-2">Upload Image</p>
      <div className="full flex gap-2 mb-2 max-w-[500px]">
        {/* image1 */}
        <div className="flex-1">
          <label htmlFor="file1">
            <img
              src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
              className="w-15 md:w-25"
            />
          </label>
          <input
            type="file"
            id="file1"
            className="hidden"
            onChange={(e) => setImage1(e.target.files[0])}
          />
        </div>
        {/* image2 */}
        <div className="flex-1">
          <label htmlFor="file2">
            <img
              src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
              className="w-15 md:w-25"
            />
          </label>
          <input
            type="file"
            name=""
            id="file2"
            className="hidden"
            onChange={(e) => setImage2(e.target.files[0])}
          />
        </div>
        {/* image3 */}
        <div className="flex-1">
          <label htmlFor="file3">
            <img
              src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
              className="w-15 md:w-25"
            />
          </label>
          <input
            type="file"
            id="file3"
            className="hidden"
            onChange={(e) => setImage3(e.target.files[0])}
          />
        </div>
        {/* image4 */}
        <div className="flex-1">
          <label htmlFor="file4">
            <img
              src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
              className="w-15 md:w-25"
            />
          </label>
          <input
            type="file"
            id="file4"
            className="hidden"
            onChange={(e) => setImage4(e.target.files[0])}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="product-name">Product name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="product-name"
            required
            placeholder="Type here"
          />
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <label htmlFor="product-desc">Product description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="product-desc"
            required
            placeholder="Write content here"
          ></textarea>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center mt-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="category">Product category</label>
            <select
              id="category"
              className="p-2 border-gray-300 rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="sub-category">Sub Category</label>
            <select
              id="sub-category"
              className="p-2 border-gray-300 rounded-md"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price">Product Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="25"
              required
              className="p-2 border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="my-4">
          <p className="mb-2">Product Sizes</p>
          <div className="flex gap-1.5 md:max-w-[250px]">
            <div
              className={`flex-1 p-1 text-center rounded-md ${
                sizes.includes("S") ? "bg-[#eb8e8e]" : "bg-gray-400"
              }`}
              onClick={() => handleSizes("S")}
            >
              S
            </div>
            <div
              className={`flex-1 p-1 text-center rounded-md ${
                sizes.includes("M") ? "bg-[#eb8e8e]" : "bg-gray-400"
              }`}
              onClick={() => handleSizes("M")}
            >
              M
            </div>
            <div
              className={`flex-1 p-1 text-center rounded-md ${
                sizes.includes("L") ? "bg-[#eb8e8e]" : "bg-gray-400"
              }`}
              onClick={() => handleSizes("L")}
            >
              L
            </div>
            <div
              className={`flex-1 p-1 text-center rounded-md ${
                sizes.includes("XL") ? "bg-[#eb8e8e]" : "bg-gray-400"
              }`}
              onClick={() => handleSizes("XL")}
            >
              XL
            </div>
            <div
              className={`flex-1 p-1 text-center rounded-md ${
                sizes.includes("XLL") ? "bg-[#eb8e8e]" : "bg-gray-400"
              }`}
              onClick={() => handleSizes("XLL")}
            >
              XLL
            </div>
          </div>
        </div>

        <div className="my-4 flex gap-2">
          <input
            type="checkbox"
            checked={bestSeller}
            onChange={(e) => setBestSeller(e.target.checked)}
            id="bestseller"
          />
          <label htmlFor="bestseller">Add to bestseller</label>
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-md"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
