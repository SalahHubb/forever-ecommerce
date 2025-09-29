import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import filterCollections from "../components/FilterCollections";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [collections, setCollections] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [sort, setSort] = useState(0);

  useEffect(() => {
    setCollections(products);
  }, []);

  useEffect(() => {
    let filteredCollection = filterCollections(products, categories, types);

    if (sort == "1") {
      // sort low to high
      filteredCollection.sort((a, b) => a.price - b.price);
    }

    if (sort == "-1") {
      // sort high to low
      filteredCollection.sort((a, b) => b.price - a.price);
    }

    setCollections(filteredCollection);
  }, [categories, types, sort]);

  const handleCategory = (e) => {
    const category = e.target.name;

    // toggle categories
    if (categories.includes(category)) {
      const newCategories = categories.filter((c) => c !== category);
      setCategories(newCategories);
      return;
    }
    setCategories([...categories, category]);
  };

  const handleType = (e) => {
    const type = e.target.name;

    // toggle types
    if (types.includes(type)) {
      const newTypes = types.filter((t) => t !== type);
      setTypes(newTypes);
      return;
    }
    setTypes([...types, type]);
  };

  return (
    <div>
      <hr className="my-6 border-[#C8C8C8]" />
      <div className="md:flex md:space-x-6">
        {/* filters */}
        <div id="filters-container" className="my-6 md:w-[315px]">
          <h3 className="font-bold flex items-center gap-2">
            FILTERS{" "}
            <span
              className="md:hidden"
              onClick={() => setShowFilter(!showFilter)}
            >
              <img src={assets.dropdown_icon} className="w-[8px] h-[12px]" />
            </span>
          </h3>

          <div className={`${showFilter ? "block" : "hidden"} md:block`}>
            <div
              id="categories-container"
              className="border-1 pl-4 pb-4 border-[#C8C8C8] my-4 md:block"
            >
              <h3 className="py-2 font-semibold">CATEGORIES</h3>
              <ul>
                <li>
                  <input type="checkbox" name="men" onClick={handleCategory} />{" "}
                  Men
                </li>
                <li className="my-2">
                  <input
                    type="checkbox"
                    name="women"
                    onClick={handleCategory}
                  />{" "}
                  Women
                </li>
                <li>
                  <input type="checkbox" name="kids" onClick={handleCategory} />{" "}
                  Kids
                </li>
              </ul>
            </div>

            <div
              id="Type-container"
              className="border-1 pl-4 pb-4 border-[#C8C8C8]"
            >
              <h3 className="py-2 font-semibold">Type</h3>
              <ul>
                <li>
                  <input type="checkbox" name="topWear" onClick={handleType} />{" "}
                  TopWear
                </li>
                <li className="my-2">
                  <input
                    type="checkbox"
                    name="bottomWear"
                    onClick={handleType}
                  />{" "}
                  BottomWear
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="winterWear"
                    onClick={handleType}
                  />{" "}
                  WinterWear
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* collections */}
        <div id="collections-container">
          <div className="flex justify-between my-2">
            <Title text1={"ALL"} text2={"COLLECTIONS"} />
            {/* options */}
            <select
              onChange={(e) => setSort(e.target.value)}
              className="border-1 p-2 border-[#C8C8C8]"
            >
              <option value="0">Sort by: Relevant</option>
              <option value="-1">Sort by: High to Low</option>
              <option value="1">Sort by: Low to High</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {collections.length == 0 ? (
              <div className="text-center">No Options available</div>
            ) : (
              collections.map((item) => {
                return (
                  <ProductItem
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.image[0]}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
