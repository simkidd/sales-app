<!-- import Item from "../models/itemModel";
import multer from "multer";

// set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // set the destination folder for uploaded images
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // set the filename to be the current timestamp plus the original file extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
  },
});

// create the multer upload instance
const upload = multer({ storage });

// create an item with image upload
export const createItem = [
  upload.single("image"), // use upload middleware to handle image upload
  async (req, res) => {
    try {
      const { title, description, price, isSold } = req.body;
      const image = req.file.path; // retrieve the file path from req.file

      const newItem = new Item({ title, description, price, image, isSold });

      const savedItem = await newItem.save();

      res
        .status(201)
        .json({ message: "Item created successfully", item: savedItem });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error creating item" });
    }
  },
];

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
    res.status(500).json({ error: "Error retrieving item" });
  }
};

// update item by id with image upload
export const updateItem = [
  upload.single("image"), // Use upload middleware to handle image upload
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, price, isSold } = req.body;
      const image = req.file ? req.file.path : undefined; // Retrieve the file path if it exists

      const updatedItem = await Item.findByIdAndUpdate(
        id,
        { title, description, price, image, isSold },
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
      res.status(500).json({ error: "Error updating item" });
    }
  },
];

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
    res.status(500).json({ error: "Error deleting item" });
  }
};

// mark an item as sold
export const markItemAsSold = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    item.isSold = true;
    const updatedItem = await item.save();

    res
      .status(200)
      .json({ message: "Item marked as sold successfully", item: updatedItem });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error marking item as sold" });
  }
}; -->

######################################
<!-- import express from 'express';
import dotenv from 'dotenv';
import itemRoutes from './routes.js';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', itemRoutes);

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); -->
