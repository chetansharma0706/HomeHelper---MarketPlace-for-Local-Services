import mongoose from "mongoose";
import { Booking } from "../models/booking.model.js";
import { Service } from "../models/service.model.js";
import { User } from "../models/user.model.js";
import { sendSMS } from "../utils/twillo.js";

export const createBooking = async (req, res) => {
  const {
    serviceId,
    serviceTitle,
    clientName,
    description,
    clientAddress,
    clientId,
  } = req.body;

  try {
    // Validate serviceId
    if (!serviceId || !mongoose.Types.ObjectId.isValid(serviceId)) {
      throw new Error("Invalid Service Id");
    }

    // Validate clientId
    if (!clientId || !mongoose.Types.ObjectId.isValid(clientId)) {
      throw new Error("Invalid userId");
    }

    // Validate other required fields
    if (!serviceTitle || !clientName || !description || !clientAddress) {
      throw new Error("All fields are required");
    }

    // Fetch service and price
    const service = await Service.findById(serviceId);
    if (!service) {
      throw new Error("Service not found");
    }

    if (!service.price) {
      throw new Error("Service price is not defined");
    }

    req.body.price = service.price;

    // Create booking
    const booking = new Booking(req.body);
    await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully!",
      booking,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSellerBookings = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const serviceIds = await Service.find({ sellerId }).select("_id");
    const bookings = await Booking.find({ serviceId: { $in: serviceIds } });
    res.status(201).json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching bookings." });
  }
};

export const updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body;

  try {
    // Validate bookingId
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      throw new Error("Invalid booking Id");
    }

    // Update the booking status
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { bookingStatus: status },
      { new: true }
    );

    if (!booking) {
      throw new Error("Booking not found.");
    }

    // Fetch client's phone number
    const { phone: clientPhoneNum } = await User.findById(
      booking.clientId
    ).select("phone");

    if (!clientPhoneNum) {
      throw new Error("Client phone number not found.");
    }

    // Send SMS to client
    const message = `Hello ${booking.clientName},

Your service request for ${booking.serviceTitle} has been ${status} by the Provider. For any changes, feel free to contact us.

-Team House Helper`;

    await sendSMS(`+91${clientPhoneNum}`, message);

    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error updating booking status." });
  }
};

export const sendOTP = async (req, res) => {
  const { bookingId } = req.params;

  try {
    // Validate bookingId
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      throw new Error("Invalid booking Id");
    }

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Fetch booking details
    const booking = await Booking.findById(bookingId);
    booking.otp = otp;
    await booking.save();

    console.log(booking);

    if (!booking) {
      throw new Error("Booking not found.");
    }

    // Fetch client's phone number
    const { phone: clientPhoneNum } = await User.findById(
      booking.clientId
    ).select("phone");

    if (!clientPhoneNum) {
      throw new Error("Client phone number not found.");
    }

    // Send OTP to client
    const body = `Hello ${booking.clientName},

Your service has been completed successfully. Please confirm your satisfaction by providing the OTP: ${otp} to the service provider.

Thank you for choosing House Helper!

-Team House Helper`;

    await sendSMS(`+91${clientPhoneNum}`, body);

    res.status(201).json({ success: true, message: "OTP sent successfully!" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, message: "Error sending OTP." });
  }
};

export const verifyOTP = async (req, res) => {
  const { bookingId } = req.params;
  const { otp } = req.body;

  try {
    // Validate bookingId
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      throw new Error("Invalid booking Id");
    }

    // Fetch booking details
    const booking = await Booking.findById(bookingId);
    console.log(booking);

    if (!booking) {
      throw new Error("Booking not found.");
    }

    if (booking.otp !== otp) {
      throw new Error(`Invalid OTP. ${otp} is incorrect.`);
    }

    // Update booking status
    booking.bookingStatus = "Completed";
    await booking.save();

    res.status(201).json({ success: true, message: "OTP verified!", booking });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, message: "Error verifying OTP." });
  }
};

export const getSellerEarnings = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const serviceIds = await Service.find({ sellerId }).select("_id");
    const bookings = await Booking.find({
      serviceId: { $in: serviceIds },
      bookingStatus: "Completed",
    });

    const earnings = bookings.reduce((acc, booking) => acc + booking.price, 0);

    res.status(201).json({ success: true, earnings });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching earnings." });
  }
};

export const cancelBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    // Validate bookingId
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      throw new Error("Invalid booking Id");
    }

    // Update the booking status
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { bookingStatus: "Cancelled" },
      { new: true }
    );

    if (!booking) {
      throw new Error("Booking not found.");
    }

    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error updating booking status." });
  }
};

export const getClientBookings = async (req, res) => {
  try {
    const { clientId } = req.params;
    const bookings = await Booking.find({ clientId });
    res.status(201).json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching bookings." });
  }
};
