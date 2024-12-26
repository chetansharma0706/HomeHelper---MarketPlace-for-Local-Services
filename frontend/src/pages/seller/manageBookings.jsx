import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/authContexts";
import Loader from "../../components/loader";
import { toast } from "react-toastify";

const ManageBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [otpmodal, setOtpModal] = useState(null);
    const [otp, setOtp] = useState("");
    const { userDetails } = useContext(AuthContext);


    const closeOtpModal = () => {
        setOtp("")
        setOtpModal(false)
    }

    // window.onclick = function (event) {
    //     if (event.target.id === "otpmodal") {
    //         closeOtpModal();
    //     }
    // }


    useEffect(() => {
        const fetchBookings = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/booking/getSellerBookings/${userDetails._id}`);
                setBookings(response.data.bookings || []);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setIsError(true);
                setIsLoading(false);
            }
        };

        fetchBookings();
        console.log(bookings);
    }, []);
    console.log(bookings);
    const updateBookingStatus = async (bookingId, status) => {
        setIsLoading(true);
        try {
            const response = await axios.put(`http://localhost:5000/api/booking/updateBookingStatus/${bookingId}`, { status });
            if (response.data.success) {
                setBookings((prevBookings) => prevBookings.map((booking) => (booking._id === bookingId ? { ...booking, bookingStatus: status } : booking)));
                setIsLoading(false);
                console.log("Booking status updated successfully!");
            } else {
                console.error("Error updating booking status:", response.data.message);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error updating booking status:", error);
            setIsLoading(false);
        }
    };


    const sendOTP = async (bookingId) => {
        setIsLoading(true);
        try {
            const response = await axios.put(`http://localhost:5000/api/booking/sendOTP/${bookingId}`);
            if (response.data.success) {
                setIsLoading(false);
                setOtpModal(bookingId);
                toast.success("OTP sent successfully!");
            } else {
                console.error("Error sending OTP:", response.data.message);
                toast.error("Error sending OTP!");
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            toast.error("Error sending OTP!");
            setIsLoading(false);
        }
    };

    const verifyOtp = async (bookingId, otp) => {
        setIsLoading(true);
        // const trimmedOtp = otp.trim();
        try {
            const response = await axios.put(`http://localhost:5000/api/booking/verifyOTP/${bookingId}`, { otp });
            if (response.data.success) {
                setBookings((prevBookings) => prevBookings.map((booking) => (booking._id === bookingId ? { ...booking, bookingStatus: "Completed" } : booking)));
                setIsLoading(false);
                closeOtpModal();
                toast.success("OTP verified successfully!");
            } else {
                console.error("Error verifying OTP:", response.data.message);
                toast.error("Error verifying OTP!");
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            toast.error("Error verifying OTP!");
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div className="text-center py-10 text-red-500">Oops! Something went wrong</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <h1 className="text-4xl font-bold text-primaryColor text-center mb-6">Manage Bookings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="bg-white rounded-lg shadow-lg p-6  text-left border border-gray-200 hover:shadow-xl"
                    >
                        <div className="flex justify-between items-start">
                            <h2 className="text-xl font-bold text-primaryColor mb-2">{booking.serviceTitle}</h2>
                            <span
                                className={`px-3 py-1 text-xs font-semibold rounded-full ${booking.bookingStatus === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : booking.bookingStatus === "Accepted"
                                        ? "bg-blue-100 text-blue-800"
                                        : booking.bookingStatus === "Completed"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                            >
                                {booking.bookingStatus}
                            </span>
                        </div>
                        <p className="text-gray-700 mb-1">
                            <span className="font-medium">Client Name: </span>
                            {booking.clientName}
                        </p>
                        <p className="text-gray-700 mb-1">
                            <span className="font-medium">Address: </span>
                            {booking.clientAddress}
                        </p>
                        <p className="text-gray-700 mb-1">
                            <span className="font-medium">Description: </span>
                            {booking.description}
                        </p>
                        {booking.bookingStatus === "Pending" ? (
                            <div className="flex gap-4">
                                <button className="mt-4 bg-primaryColor text-white px-4 py-2 rounded-md hover:bg-secondaryColor focus:outline-none" onClick={() => updateBookingStatus(booking._id, "Accepted")}>Accept</button>
                                <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800 focus:outline-none" onClick={() => updateBookingStatus(booking._id, "Rejected")}>Reject</button> </div>) :
                            booking.bookingStatus === "Accepted" ? (
                                <button className="mt-4 bg-primaryColor text-white px-4 py-2 rounded-md hover:bg-secondaryColor focus:outline-none" onClick={() => sendOTP(booking._id)}>Mark as Completed</button>
                            ) : null}

                        {otpmodal && otpmodal === booking._id && (<div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center" id="otpmodal">
                            <div className="bg-white p-8 rounded-lg w-96">
                                {/* Close Icon */}
                                <p
                                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                                    onClick={closeOtpModal}
                                    aria-label="Close Modal"
                                >
                                    &times;
                                </p>
                                <h2 className="text-sm font-semibold text-center mb-4">Please enter the OTP sent to your client's {booking.clientName} phone number.</h2>
                                <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full border border-gray-300 rounded p-2 mb-4 outline-none" />
                                <div className="flex gap-5">
                                    <button className="bg-primaryColor hover:bg-secondaryColor text-white py-2 px-4 rounded" onClick={() => verifyOtp(booking._id, otp)}>Verify</button>
                                    <button className="text-primaryColor hover:text-secondaryColor underline text-sm" onClick={() => sendOTP(booking._id)}>Resend</button>
                                </div>
                            </div>
                        </div>)}

                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageBooking;
