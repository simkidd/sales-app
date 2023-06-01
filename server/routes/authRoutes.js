import express from 'express';
import { register, login } from '../controllers/authController';
import { loginValidation, registerValidation } from '../middleware/validator';


const router = express.Router();

// Register a new user
router.post('/register', registerValidation, register);

// User login
router.post('/login', loginValidation, login);

// User logout
// router.post('/logout', logout);

export default router;