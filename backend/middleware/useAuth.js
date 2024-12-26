import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const useAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.userId) {
      // Fetch user details from the database
      const user = await User.findById(decodedToken.userId).select("-password"); // Exclude sensitive info
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found. Please log in again.",
        });
      }

      // Attach user details to the request
      req.user = user;
      next();
    } else {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};
