import User from "../models/userModel";

// Create a new user (only admin)
export const createUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    const newUser = new User({
      name,
      email,
      password,
      isAdmin,
    });

    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Get all users (only admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error retrieving users" });
  }
};

// Get a user by ID (only admin)
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User retrieved successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get user" });
  }
};

// Update a user by ID (only admin)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, isAdmin } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password, isAdmin },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete a user by ID (only admin)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndRemove(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
