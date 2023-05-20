import jwt from "jsonwebtoken";
import User from "../models/userModel";

const protect = async (req, res, next) => {
  let token;

  // Check if the request has an Authorization header starting with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using the JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Retrieve user from the database by ID
      const user = await User.findById(decoded.id).select("-password");

      // Exclude the password field if the user exists
      if (user) {
        req.user = user;
      } else {
        res.status(404).json({error: "User not found"});
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Not authorized, token failed" });
    }
  }

  // If no valid token was found, send a 401 Unauthorized response
  if (!token) {
    res.status(401).json({ error: "Not authorized, no token" });
  }
};

export default protect;
