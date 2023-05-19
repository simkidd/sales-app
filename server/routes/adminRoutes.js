import express from "express";
import { adminLogin, adminRegister, adminLogout } from "../controllers/adminController";

const router = express.Router();

// Admin login
router.post("/login", adminLogin);

// Admin registration
router.post("/register", adminRegister);

// Admin logout
router.post("/logout", adminLogout);

export default router;
