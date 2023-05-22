import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-white font-bold text-xl">Product</h1>
        <div>
          <a href="/product" className="text-white hover:text-blue-300 mr-4">
            Product
          </a>
          <a href="/category" className="text-white hover:text-blue-300">
            Category
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
