import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import protect, { admin } from "../middleware/auth";

const router = express.Router();

// create a new item
router.post("/products", protect, admin, createProduct);

// retrieve all items
router.get("/products", getAllProducts);

// get an item
router.get("/products/:productId", getProduct);

// update an item
router.put("/products/:productId", protect, admin, updateProduct);

// delete an item
router.delete("/products/:productId",protect, admin, deleteProduct);

export default router;
