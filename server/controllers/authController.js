import bcrypt from "bcrypt";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";
import { validationResult } from "express-validator";

export const register = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Logic to register a new user
    const {
      firstName,
      lastName,
      email,
      password,
      // confirmPassword,
      dateOfBirth,
      gender,
    } = req.body;

    // Check if the email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      dateOfBirth,
      gender,
    });

    // Generate an authentication token
    const token = generateToken(newUser._id);

    // Save the user to the database
    await newUser.save();

    // Remove password and confirmPassword fields from the user object
    newUser.password = "";
    // newUser.confirmPassword = "";

    res.status(200).json({
      message: "User registered successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

export const login = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Logic to handle user login
    const { email, password } = req.body;

    // Find the user in the database based on the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the password with the stored password hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate an authentication token
    const token = generateToken(user._id);

    // res.cookie("token", token, {
    //   // Set the token as a cookie in the response
    //   httpOnly: true,
    //   secure: true, // Enable this if you're using HTTPS
    //   sameSite: "none", // Enable this if you're using cross-site requests
    // });

    // Remove password and confirmPassword fields from the user object
    user.password = "";

    res.status(200).json({
      message: "Logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
};

export const logout = async (req, res) => {
  try {
    // Logic to handle user logout

    // Clear the authentication token from the client-side
    res.clearCookie("token");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to logout" });
  }
};
