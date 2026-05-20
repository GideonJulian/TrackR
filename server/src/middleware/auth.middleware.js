import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

 const protectRoute = async (req, res, next) => {
  try {
    /**
     * GET TOKEN
     */
    const token =
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    /**
     * VERIFY TOKEN
     */
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    /**
     * FIND USER
     */
    const user = await User.findById(decoded.id).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    /**
     * SAVE USER TO REQUEST
     */
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default protectRoute;