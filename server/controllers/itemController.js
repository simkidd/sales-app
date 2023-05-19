import Item from "../models/itemModel";
import multer from "multer";
import storage from "../config/cloudinaryConfig";

// create the multer upload instance
const upload = multer({ storage: storage }).single("image");

// create an item with image upload
export const createItem = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const { name, description, price, category } = req.body;
    const image = req.file ? req.file.path : null; // Retrieve the file path from req.file if it exists

    const newItem = new Item({
      name,
      description,
      price,
      category,
      image,
      isSold: false,
    });

    const savedItem = await newItem.save();

    res
      .status(201)
      .json({ message: "Item created successfully", item: savedItem });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create item" });
  }
};

// get all items
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();

    res.status(200).json({ message: "Items retrieved successfully", items });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error retrieving all items" });
  }
};

// get item by id
export const getItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Item retrieved successfully", item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get item" });
  }
};

// update item by id with image upload
export const updateItem = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const { id } = req.params;
    const { name, description, price, category, isSold } = req.body;
    const image = req.file.path;

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, description, price, category, image, isSold },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res
      .status(200)
      .json({ message: "Item updated successfully", item: updatedItem });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update item" });
  }
};

// delete item by id
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Item.findByIdAndRemove(id);

    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res
      .status(200)
      .json({ message: "Item deleted successfully", item: deletedItem });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete item" });
  }
};

// mark an item as sold
export const markItemSold = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findByIdAndUpdate(
      id,
      { isSold: true },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const updatedItem = await item.save();

    res.status(200).json({
      message: "Item marked as sold successfully",
      item: updatedItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to mark item as sold" });
  }
};
