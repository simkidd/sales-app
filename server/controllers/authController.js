import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel";

// Function to generate an authentication token
const generateAuthToken = (user) => {
  // Generate a unique payload based on the user details
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  // Generate a JWT token with the payload and a secret key
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  return token;
};

export const register = async (req, res) => {
  try {
    // Logic to register a new user
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

    // Check if the email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 characters" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      isAdmin: req.body.isAdmin || false,
    });
    // Save the user to the database
    await newUser.save();

    // Generate an authentication token
    const token = generateAuthToken(newUser);

    res.status(200).json({
      message: "User registered successfully",
      token,
      data: { newUser },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
};

export const login = async (req, res) => {
  try {
    // Logic to handle user login
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

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
    const token = generateAuthToken(user);

    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   expiresIn: "1d",
    // });

    res.status(200).json({
      message: "Logged in successfully",
      token,
      data: { user },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};

export const logout = (req, res) => {
  try {
    // Clear JWT token from client-side cookie
    res.clearCookie("jwt");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to logout" });
  }
};
