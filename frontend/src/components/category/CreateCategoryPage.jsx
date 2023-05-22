import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCategoryPage = () => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/cats", newCategory);
      toast.success("Category created");
      setNewCategory({
        name: "",
        description: "",
        image: "",
      });
    } catch (error) {
      console.log("Failed to create category", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Create Category</h2>
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newCategory.name}
              onChange={handleInputChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newCategory.description}
              onChange={handleInputChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="image"
            >
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={newCategory.image}
              onChange={handleInputChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
              required
            />
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

export default CreateCategoryPage;
