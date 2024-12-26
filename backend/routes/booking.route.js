import express from "express";
import {
  createBooking,
  getSellerBookings,
  updateBookingStatus,
  sendOTP,
  verifyOTP,
  getSellerEarnings,
  cancelBooking,
  getClientBookings,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/create", createBooking);
router.get("/getSellerBookings/:sellerId", getSellerBookings);
router.get("/getClientBookings/:clientId", getClientBookings);
router.put("/updateBookingStatus/:bookingId", updateBookingStatus);
router.put("/sendOTP/:bookingId", sendOTP);
router.put("/verifyOTP/:bookingId", verifyOTP);
router.get("/getSellerEarnings/:sellerId", getSellerEarnings);
router.put("/cancelBooking/:bookingId", cancelBooking);

export default router;
