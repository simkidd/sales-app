import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser
} from "../controllers/userController";
import protect, { admin } from "../middleware/auth";

const router = express.Router();

// Create a new user (only admin)
router.post("/users",protect,admin, createUser);

// Get all users (only admin)
router.get("/users", protect, admin, getAllUsers);

// Get a user by ID (only admin)
router.get("/users/:id", protect, admin, getUser);

// Update a user by ID (only admin)
router.put("/users/:id", protect, admin, updateUser);

// Delete a user by ID (only admin)
router.delete("/users/:id", protect, admin, deleteUser);

// Define the routes for blocking and unblocking users
router.put("/users/:id/block",protect, admin, blockUser);
router.put("/users/:id/unblock",protect, admin, unblockUser);

export default router;
