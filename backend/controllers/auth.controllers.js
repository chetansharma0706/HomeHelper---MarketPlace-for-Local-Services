import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateJwtTokenAndSetCookie } from "../utils/generateJwtTokenAndSetCookie.js";

export const signup = async (req, res) => {
  console.log(req);
  console.log(res);
  const { email, name, password, phone, description, isSeller } = req.body;
  try {
    if (!email || !password || !phone) {
      throw new Error("All Fields ae Required");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      phone,
      description,
      isSeller,
    });

    await newUser.save();

    // jwt
    generateJwtTokenAndSetCookie(res, newUser._id);
    // Find the user by email
    const user = await User.findOne({ email });
    const userWithOutPassword = await User.findById(user._id).select(
      "-password"
    ); // Exclude sensitive info

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: userWithOutPassword,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      // If user doesn't exist, return specific error
      return res
        .status(404)
        .json({ success: false, message: "Invalid email or user not found" });
    }

    // Compare the password provided with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password); // Corrected the argument order
    if (!isPasswordCorrect) {
      // If the password is incorrect, return specific error
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    // jwt
    generateJwtTokenAndSetCookie(res, user._id);

    const userWithOutPassword = await User.findById(user._id).select(
      "-password"
    ); // Exclude sensitive info

    // Return success response with user data (excluding sensitive fields like password)
    return res.status(200).json({
      success: true,
      user: userWithOutPassword,
    });
  } catch (error) {
    // Catch unexpected errors and return a generic message
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true, // This prevents JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Only sends the cookie over HTTPS in production
      sameSite: "strict",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  res.json({ success: true, message: "LogOut Successfully" });
};
