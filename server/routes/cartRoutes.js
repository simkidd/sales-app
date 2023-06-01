import express from "express";
import {
  addToCart,
  getCartItems,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../controllers/cartController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// Get the cart items
router.get("/cart", protect, getCartItems);

// Add a product to the cart
router.post("/cart/add/:productId", protect, addToCart);

// Increase quantity of a cart item
router.put("/cart/increase/:cartItemId", protect, increaseQuantity);

// Decrease quantity of a cart item
router.put("/cart/decrease/:cartItemId", protect, decreaseQuantity);

// Remove a product from the cart
router.delete("/cart/remove/:cartItemId", protect, removeFromCart);

// Clear the cart
router.delete("/cart/clear",protect, clearCart);

export default router;
