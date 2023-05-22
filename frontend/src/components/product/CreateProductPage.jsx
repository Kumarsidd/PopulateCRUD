import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/cats");
      setCategories(response.data.data);
    } catch (error) {
      console.log("Failed to fetch categories", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "productName") {
      setProductName(value);
    } else if (name === "productDescription") {
      setProductDescription(value);
    } else if (name === "productPrice") {
      setProductPrice(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name: productName,
      description: productDescription,
      price: productPrice,
      category: selectedCategory,
    };

    try {
      await axios.post("/products/create", newProduct);
      toast.success("Product created");
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setSelectedCategory("");
    } catch (error) {
      console.log("Failed to create product", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Create Product</h2>
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="productName"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={productName}
              onChange={handleInputChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="productDescription"
            >
              Product Description
            </label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={productDescription}
              onChange={handleInputChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="productPrice"
            >
              Product Price
            </label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              value={productPrice}
              onChange={handleInputChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded w-full"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;
