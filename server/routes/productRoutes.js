import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  markProductSold,
  deleteProduct,
} from "../controllers/productController";
import protect, { admin } from "../middleware/auth";

const router = express.Router();

// create a new item
router.post("/products", protect, admin, createProduct);

// retrieve all items
router.get("/products", getAllProducts);

// admin get all product
router.get("/products/all", protect, admin);

// get an item
router.get("/products/:id", getProduct);

// update an item
router.put("/products/:id", protect, admin, updateProduct);

// delete an item
router.delete("/products/:id",protect, admin, deleteProduct);

// mark an item as sold
router.put("/products/:id/sold", markProductSold);

export default router;
