import mongoose from "mongoose";
import { Service } from "../models/service.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createService = async (req, res) => {
  const { userId, title, sellerName, description, price, category } = req.body;

  try {
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid userId");
    }

    if (!title || !sellerName || !description || !price || !category) {
      throw new Error("All fields are required");
    }

    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).json({ message: "No file uploaded." });
    }

    const uploadResult = await uploadOnCloudinary(req.file.path);

    const newService = new Service({
      sellerId: userId, // Convert to ObjectId
      title,
      sellerName,
      description,
      price,
      category,
      bannerImage: uploadResult.url,
    });

    await newService.save();

    res
      .status(200)
      .json({ success: true, message: "Service created successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getUserServices = async (req, res) => {
  const { userId } = req.body;

  try {
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid userId");
    }
    const userServices = await Service.find({ sellerId: userId });

    if (!userServices) {
      res
        .status(200)
        .json({ success: true, message: "Seller hasn't Created Any Services" });
    } else {
      res.status(200).json({
        success: true,
        message: "Service Fetched successfully!",
        userServices: userServices,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const Services = await Service.find();

    if (!Services) {
      res.status(200).json({ success: true, message: "No Service Exist" });
    } else {
      res.status(200).json({
        success: true,
        message: "Service Fetched successfully!",
        AllServices: Services,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getService = async (req, res) => {
  const { serviceId } = req.body;
  try {
    const service = await Service.findOne({ _id: serviceId });

    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    res.status(200).json({
      success: true,
      message: "Service data fetched successfully",
      service,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteService = async (req, res) => {
  const { serviceId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      throw new Error("Invalid service Id");
    }

    const service = await Service.findByIdAndDelete(serviceId);

    if (!service) {
      throw new Error("Service not found.");
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
