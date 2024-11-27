import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateJwtTokenAndSetCookie } from "../utils/generateJwtTokenAndSetCookie.js";

export const signup = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    if (!email || !password) {
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
    });

    await newUser.save();

    // jwt
    generateJwtTokenAndSetCookie(res, newUser._id);

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const login = async (req, res) => {
  res.send("This is login Page");
};
export const logout = async (req, res) => {
  res.send("This is logout Page");
};
