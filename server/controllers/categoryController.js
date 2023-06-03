import Category from "../models/categoryModel";
import Product from "../models/productModel";

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if the required fields are provided
    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Name and description are required fields" });
    }

    // Check if the category name already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }

    // Create a new category instance
    const newCategory = new Category({
      name,
      description,
      products: [],
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

    res.status(200).json({
      total: categories.length,
      message: "Categories retrieved successfully",
      categories,
    });
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

    res
      .status(200)
      .json({ message: "Category retrieved successfully", category });
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

    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
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

    // Remove the category from all products that belong to it
    await Product.updateMany(
      { category: id },
      { $unset: { category: "" } }
    );

    res.status(200).json({
      message: "Category deleted successfully",
      category: deletedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete category" });
  }
};

// Add a product to a category
export const addProductToCategory = async (req, res) => {
  try {
    const { categoryId, productId } = req.body;

    // Find the category and product
    const category = await Category.findById(categoryId);
    const product = await Product.findById(productId);

    // Check if the category or product is not found
    if (!category || !product) {
      return res.status(404).json({ error: "Category or product not found" });
    }

    // Check if the product is already in the category
    if (category.products.includes(productId)) {
      return res
        .status(400)
        .json({ error: "Product already exists in the category" });
    }

    // Add the product to the category
    category.products.push(productId);
    await category.save();

    // Set the category for the product
    product.category = categoryId;
    await product.save();

    res.status(200).json({
      message: "Product added to category successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add product to category" });
  }
};

// Get products in a particular category
export const getProductsInCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Find the category by ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Find the products in the category
    const products = await Product.find({ category: categoryId });

    res.status(200).json({ category, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get products in category" });
  }
};
