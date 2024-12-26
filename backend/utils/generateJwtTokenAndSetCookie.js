import jwt from "jsonwebtoken";

export const generateJwtTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Set the token in an HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true, // This prevents JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === "production", // Only sends the cookie over HTTPS in production
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // Sets the cookie expiry to 1 day (in milliseconds)
  });

  return token;
};
