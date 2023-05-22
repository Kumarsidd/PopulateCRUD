import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import CreateProductPage from "./CreateProductPage";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editProduct, setEditProduct] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/products");
      setProducts(response.data.data);
    } catch (error) {
      console.log("Failed to fetch products", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/cats");
      setCategories(response.data.data);
    } catch (error) {
      console.log("Failed to fetch categories", error);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "";
  };

  const handleEditProduct = (productId) => {
    setEditingProductId(productId);
    setIsEditing(true);
    const product = products.find((prod) => prod._id === productId);
    setEditProduct({
      ...product,
      category: product.category._id, // Set the category ID
    });
    console.log(getCategoryName(productId));
  };

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `/products/${editProduct._id}`,
        editProduct
      );
      const updatedProducts = products.map((prod) =>
        prod._id === editProduct._id ? response.data.data : prod
      );
      setProducts(updatedProducts);
      setIsEditing(false);
      setEditingProductId(null);
      toast.success("Product updated");
    } catch (error) {
      console.log("Failed to update product", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`/products/${productId}`);
      const updatedProducts = products.filter((prod) => prod._id !== productId);
      setProducts(updatedProducts);
      console.log(isEditing);
      toast.success("Product deleted");
    } catch (error) {
      console.log("Failed to delete product", error);
    }
  };

  return (
    <>
      {/* <CreateProductPage /> */}
      <div className="container mx-auto px-4 py-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">All Products</h2>
        <hr className="my-4" />
        <ul>
          {products.map((product) => (
            <li
              key={product._id}
              className="flex items-center justify-between mb-4"
            >
              <div>
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-gray-600">
                  Description: {product.description}
                </p>
                <p className="text-gray-600">Price: {product.price}</p>
                <p className="text-gray-600">
                  Category: {getCategoryName(product.category)}
                </p>
              </div>
              <div className="flex  ml-4">
                {editingProductId === product._id ? (
                  <form
                    onSubmit={handleUpdateProduct}
                    className="flex flex-col"
                  >
                    <input
                      type="text"
                      value={editProduct.name}
                      onChange={(e) =>
                        setEditProduct({ ...editProduct, name: e.target.value })
                      }
                      className="border border-gray-300 px-2 py-1 rounded mb-2"
                      required
                    />
                    <input
                      type="text"
                      value={editProduct.description}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          description: e.target.value,
                        })
                      }
                      className="border border-gray-300 px-2 py-1 rounded mb-2"
                      required
                    />
                    <input
                      type="text"
                      value={editProduct.price}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          price: e.target.value,
                        })
                      }
                      className="border border-gray-300 px-2 py-1 rounded mb-2"
                      required
                    />
                    <select
                      value={editProduct.category}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          category: e.target.value,
                        })
                      }
                      className="border border-gray-300 px-2 py-1 rounded mb-2"
                      required
                    >
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
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
                      onClick={() => handleEditProduct(product._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
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

export default ProductPage;
