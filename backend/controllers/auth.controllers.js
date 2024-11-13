import { User } from "../models/user.model";
import { bcrypt } from "bcryptjs";
import { generateJwtTokenAndSetCookie } from "../utils/generateJwtTokenAndSetCookie";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("All Fields ae Required");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists!" });
    }
    const hashesdPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = User({
      email,
      password: hashesdPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() * 24 * 60 * 60 * 1000, // 24 hours
    });

    await user.save();

    // jwt
    generateJwtTokenAndSetCookie(res, user._id);

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {}
};
export const login = async (req, res) => {
  res.send("This is login Page");
};
export const logout = async (req, res) => {
  res.send("This is logout Page");
};
