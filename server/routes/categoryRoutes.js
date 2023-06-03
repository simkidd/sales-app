import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  addProductToCategory,
  getProductsInCategory,
} from "../controllers/categoryController";
import protect, { admin } from "../middleware/auth";

const router = express.Router();

// Create a new category
router.post("/categories", protect, admin, createCategory);

// Get all categories
router.get("/categories", getAllCategories);

// Get a single category by ID
router.get("/categories/:id", getCategory);

// Update a category by ID
router.put("/categories/:id", protect, admin, updateCategory);

// Delete a category by ID
router.delete("/categories/:id", protect, admin, deleteCategory);

// Add a product to a category
router.post(
  "/categories/:categoryId/products",
  protect,
  admin,
  addProductToCategory
);

// Get products in a particular category
router.get("/categories/:categoryId/products", getProductsInCategory);

export default router;
