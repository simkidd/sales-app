import express from "express";
import protect from "../middleware/auth";
import User from "../models/userModel";
import bcrypt from "bcrypt"

const router = express.Router();

// get user profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Profile retrieved", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get user profile" });
  }
});

// update user profile
router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.status(200).json({ message: "Profile updated", data: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update user profile" });
  }
});

export default router;
