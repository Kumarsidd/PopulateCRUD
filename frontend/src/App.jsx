import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import CreateProductPage from "./components/product/CreateProductPage";
// import Category from "./components/category/Category";
// import Product from "./components/product/Product";

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <Category /> */}
      {/* <Product /> */}
      <CreateProductPage />
      <ToastContainer />
    </div>
  );
};

export default App;
