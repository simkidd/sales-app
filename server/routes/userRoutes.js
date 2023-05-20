import express from 'express'; 
import { createUser, getAllUsers, getUser, updateUser, deleteUser } from '../controllers/userController';
import protect from '../middleware/auth';

const router = express.Router();

// Create a new user (only admin)
router.post('/users', createUser);

// Get all users (only admin)
router.get('/users', protect, getAllUsers);

// Get a user by ID (only admin)
router.get('/users/:id', protect, getUser);

// Update a user by ID (only admin)
router.put('/users/:id', updateUser);

// Delete a user by ID (only admin)
router.delete('/users/:id', deleteUser);

export default router;