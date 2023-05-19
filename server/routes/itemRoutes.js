import express from "express";
import {
  createItem,
  getAllItems,
  getItem,
  updateItem,
  deleteItem,
  markItemSold,
} from "../controllers/itemController";
import { verifyTokenAndAdmin } from "../middleware/adminAuth";

const router = express.Router();

// create a new item
router.post("/items", verifyTokenAndAdmin, createItem);

// retrieve all items
router.get("/items", getAllItems);

// get an item
router.get("/items/:id", getItem);

// update an item
router.put("/items/:id", verifyTokenAndAdmin, updateItem);

// delete an item
router.delete("/items/:id", verifyTokenAndAdmin, deleteItem);

// mark an item as sold
router.put("/items/:id/sold", verifyTokenAndAdmin, markItemSold);

export default router;
