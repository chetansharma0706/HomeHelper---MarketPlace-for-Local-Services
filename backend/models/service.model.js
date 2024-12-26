import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
  },
  sellerName: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
  },
  category: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
  },
  description: {
    type: String,
    required: true,
    maxlength: 500, // Limit description to 500 characters
  },
  bannerImage: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Price cannot be negative
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date to the current date
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // ref to users collection
  },
});

export const Service = mongoose.model("Service", serviceSchema);
