import express from "express";
import protect from "../middleware/auth";
import User from "../models/userModel";
import bcrypt from "bcrypt";

const router = express.Router();

// get user profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Profile retrieved", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get user profile" });
  }
});

// update user profile
router.put("/profile", protect, async (req, res) => {
  try {
    const { id } = req.user; // Get the user ID from the authenticated user
    const { firstName, lastName, password, dateOfBirth, gender } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        password,
        dateOfBirth,
        gender,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Profile updated", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update user profile" });
  }
});

export default router;
