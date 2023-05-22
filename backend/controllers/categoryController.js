import Category from "../models/categorySchema.js";

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(201).json({
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      error: `Failed to get category + ${error}`,
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const data = req.body;
    const finalData = await Category.create(data);

    res.status(201).json({
      message: "category stored",
      data: finalData,
    });
  } catch (error) {
    res.status(500).json({
      error: `Failed to create category + ${error}`,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(201).json({
      message: "category updated",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      error: `Failed to update category + ${error}`,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(201).json({
      message: "category deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: `Failed to delete category + ${error}`,
    });
  }
};

export { getAllCategory, createCategory, updateCategory, deleteCategory };
