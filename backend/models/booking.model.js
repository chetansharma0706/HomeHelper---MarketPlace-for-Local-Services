import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Service",
  },
  serviceTitle: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
  },
  clientName: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
  },
  description: {
    type: String,
    required: true,
    maxlength: 500, // Limit description to 500 characters
  },
  clientAddress: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date to the current date
  },
  bookingStatus: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected", "Completed", "Cancelled"],
    default: "Pending", // Default status when a booking is created
  },
  otp: {
    type: String,
    default: null,
  }, // New OTP field
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // ref to users collection
  },
});

export const Booking = mongoose.model("Booking", bookingSchema);
