import Product from "../models/productModel";
import Category from "../models/categoryModel";

// create an Product with image upload
export const createProduct = async (req, res) => {
  try {
    const { name, description, image, price, category } = req.body;

    // Check if the category exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Check if the required fields are provided
    if (!name || !description || !price || !category) {
      return res
        .status(400)
        .json({ error: "Name, description, price, and category are required fields" });
    }

    const productExist = await Product.findOne({ name });
    if (productExist) {
      return res.status(400).json({ error: "Product name already exists" });
    }

    // Create a new product instance
    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();
    
    // Add the product to the category's products array
    existingCategory.products.push(savedProduct._id);
    await existingCategory.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create Product" });
  }
};

// get all Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      message: "Products retrieved successfully",
      total: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error retrieving all Products" });
  }
};

// get Product by id
export const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product retrieved successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get Product" });
  }
};

// update Product by id with image upload
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price, image, isSold } = req.body;
    // const image = req.file.path;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { name, description, price, image, isSold },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update Product" });
  }
};

// delete Product by id
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete Product" });
  }
};
