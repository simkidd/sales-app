import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

// Middleware to verify the token and check for admin role
export const verifyTokenAndAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ error: "You are not authenticated!" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.isAdmin) {
      return res
        .status(403)
        .json({ error: "You are not authorized to perform this action!" });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ error: "Token is not valid!" });
  }
};
