import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "ddm3wuj69",
  api_key: "933731446699645",
  api_secret: "gFnqFrGKeTZEI7pKlxqQn_85rsk", // Click 'View API Keys' above to copy your API secret
});

// Upload an image
export const uploadOnCloudinary = async (localFilePath) => {
  const uploadResult = await cloudinary.uploader
    .upload(localFilePath, {
      resource_type: "auto",
    })
    .catch((error) => {
      console.log(error);
    });

  return uploadResult;
};
