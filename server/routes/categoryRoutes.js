import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";

const router = express.Router();

// Create a new category
router.post("/categories", createCategory);

// Get all categories
router.get("/categories", getAllCategories);

// Get a single category by ID
router.get("/categories/:id", getCategory);

// Update a category by ID
router.put("/categories/:id", updateCategory);

// Delete a category by ID
router.delete("/categories/:id", deleteCategory);

export default router;
