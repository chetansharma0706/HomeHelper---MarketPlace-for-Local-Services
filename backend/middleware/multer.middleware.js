import multer from "multer";
import fs from "fs";
import path from "path";
// Set up disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempPath = path.join(".", "temp"); // Temporary storage folder
    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath, { recursive: true }); // Create folder if it doesn't exist
    }
    cb(null, tempPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Multer instance
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and WebP are allowed."));
    }
  },
});
