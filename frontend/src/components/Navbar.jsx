import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-white font-bold text-xl">Product</h1>
        <div>
          <Link to="/product" className="text-white hover:text-blue-300 mr-4">
            Product
          </Link>
          <Link to="/category" className="text-white hover:text-blue-300">
            Category
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
