import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure the category name is unique
  },
  description: {
    type: String,
    required: false,
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model("category", categorySchema);

export default Category;
