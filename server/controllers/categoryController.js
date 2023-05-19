import Category from "../models/categoryModel";

// create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if the category name already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }

    // Create a new category instance
    const newCategory = new Category({
      name,
      description,
    });

    // Save the category to the database
    const savedCategory = await newCategory.save();

    res.status(201).json({
      message: "Category created successfully",
      category: savedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create category" });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res
      .status(200)
      .json({ total: categories.length, message: "Categories retrieved successfully", categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error retrieving categories" });
  }
};

// Get a single category by ID
export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category retrieved successfully", category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get category" });
  }
};

// Update a category by ID
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res
      .status(200)
      .json({ message: "Category updated successfully", category: updatedCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update category" });
  }
};

// Delete a category by ID
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndRemove(id);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res
      .status(200)
      .json({ message: "Category deleted successfully", category: deletedCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete category" });
  }
};
