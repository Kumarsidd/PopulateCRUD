import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateCategoryPage from "./CreateCategoryPage";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

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

  const handleEditCategory = (categoryId) => {
    console.log(isEditing);
    setEditingCategoryId(categoryId);

    setIsEditing(true);
    const category = categories.find((cat) => cat._id === categoryId);
    setEditCategory(category);
  };

  const handleUpdateCategory = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    try {
      const response = await axios.put(
        `/cats/${editCategory._id}`,
        editCategory
      );
      const updatedCategories = categories.map((cat) =>
        cat._id === editCategory._id ? response.data.data : cat
      );
      setCategories(updatedCategories);
      setIsEditing(false);
      setEditingCategoryId(null);
      toast.success("Category updated, refresh to check");
    } catch (error) {
      console.log("Failed to update category", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`/cats/${categoryId}`);
      const updatedCategories = categories.filter(
        (cat) => cat._id !== categoryId
      );
      setCategories(updatedCategories);
      toast.success("Category deleted");
    } catch (error) {
      console.log("Failed to delete category", error);
    }
  };

  return (
    <>
      <CreateCategoryPage />
      <div className="container px-4 py-6 mx-auto">
        <h2 className="text-2xl font-bold mb-4">All Categories</h2>
        <ul>
          {categories.map((category) => (
            <li
              key={category._id}
              className="flex flex-col md:flex-row items-center justify-between bg-white rounded shadow-md p-4 mb-4"
            >
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold">{category.name}</h3>
                <p className="text-gray-600">Name: {category.name}</p>
                <p className="text-gray-600">
                  Description: {category.description}
                </p>
                <p className="text-gray-600">Image: {category.image}</p>
              </div>
              <div className="flex flex-col md:flex-row items-center">
                {editingCategoryId === category._id ? (
                  <form
                    onSubmit={handleUpdateCategory}
                    className="flex flex-col md:flex-row md:items-center"
                  >
                    <input
                      type="text"
                      value={editCategory.name}
                      onChange={(e) =>
                        setEditCategory({
                          ...editCategory,
                          name: e.target.value,
                        })
                      }
                      className="border border-gray-300 px-2 py-1 rounded mb-2 md:mb-0 md:mr-2"
                    />
                    <input
                      type="text"
                      value={editCategory.description}
                      onChange={(e) =>
                        setEditCategory({
                          ...editCategory,
                          description: e.target.value,
                        })
                      }
                      className="border border-gray-300 px-2 py-1 rounded mb-2 md:mb-0 md:mr-2"
                    />
                    <input
                      type="text"
                      value={editCategory.image}
                      onChange={(e) =>
                        setEditCategory({
                          ...editCategory,
                          image: e.target.value,
                        })
                      }
                      className="border border-gray-300 px-2 py-1 rounded mb-2 md:mb-0 md:mr-2"
                    />

                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                  </form>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditCategory(category._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded mb-2 md:mb-0 md:mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CategoriesPage;
