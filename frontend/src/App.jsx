import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CreateProductPage from "./components/product/CreateProductPage";
import CreateCategoryPage from "./components/category/CreateCategoryPage";
import Category from "./components/category/Category";
import Product from "./components/product/Product";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<CreateProductPage />} />
          <Route path="/create-category" element={<CreateCategoryPage />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product" element={<Product />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
