import express from "express";
import {
  createItem,
  getAllItems,
  getItem,
  updateItem,
  deleteItem,
  markItemSold,
} from "../controllers/itemController";

const router = express.Router();

// create a new item
router.post("/items", createItem);

// retrieve all items
router.get("/items", getAllItems);

// get an item
router.get("/items/:id", getItem);

// update an item
router.put("/items/:id", updateItem);

// delete an item
router.delete("/items/:id", deleteItem);

// mark an item as sold
router.put("/items/:id/sold", markItemSold);

export default router;
