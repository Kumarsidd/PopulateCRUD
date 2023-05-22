import Product from "../models/productSchema.js";

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products) {
      res.status(401).json({
        message: "no products available",
      });
    }

    res.status(201).json({
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: `failed to get products + ${error}`,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const data = await Product.create(product);

    res.status(201).json({
      message: "product created",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: `failed to create products + ${error}`,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    // console.log(req.params.id);
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ error: "product not found" });
    }
    res.status(201).json({
      message: "product updated",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      error: `Failed to update product + ${error}`,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "product not found" });
    }

    res.status(201).json({
      message: "product deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: `Failed to delete product + ${error}`,
    });
  }
};

export { getAllProduct, createProduct, updateProduct, deleteProduct };
