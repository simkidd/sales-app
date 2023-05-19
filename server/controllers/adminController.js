import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel";

// Admin registration
export const adminRegister = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

    // Check if the username already exists
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res.status(400).json({ error: "Username already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 characters" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin document
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });

    // generate auth token on success
    const token = jwt.sign({ _id: newAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Save the admin document to the database
    await newAdmin.save();

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      admin: {
        ...newAdmin._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Admin login
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: "admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);

    res.cookie("jwt", token, {
      httpOnly: true,
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        ...admin._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Admin logout
export const adminLogout = (req, res) => {
  try {
    // Clear JWT token from client-side cookie
    res.clearCookie("jwt");

    res.status(200).json({ message: "Admin logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
