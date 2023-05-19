import express from 'express';
import { verifyTokenAndAdmin } from '../middleware/adminAuth'; 
import { createUser, getAllUsers, getUser, updateUser, deleteUser } from '../controllers/userController';

const router = express.Router();

// Create a new user (only admin)
router.post('/users', verifyTokenAndAdmin, createUser);

// Get all users (only admin)
router.get('/users', verifyTokenAndAdmin, getAllUsers);

// Get a user by ID (only admin)
router.get('/users/:id', verifyTokenAndAdmin, getUser);

// Update a user by ID (only admin)
router.put('/users/:id', verifyTokenAndAdmin, updateUser);

// Delete a user by ID (only admin)
router.delete('/users/:id', verifyTokenAndAdmin, deleteUser);

export default router;
