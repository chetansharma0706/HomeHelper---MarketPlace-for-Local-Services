import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/authContexts";
import Loader from "../../components/loader";
import { toast } from "react-toastify";

const ClientManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const { userDetails } = useContext(AuthContext);

    useEffect(() => {
        const fetchBookings = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/booking/getClientBookings/${userDetails._id}`);
                setBookings(response.data.bookings || []);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setIsError(true);
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, [userDetails._id]);

    const updateBookingStatus = async (bookingId) => {
        setIsLoading(true);
        try {
            const response = await axios.put(`http://localhost:5000/api/booking/cancelBooking/${bookingId}`, { status: "Cancelled" });
            if (response.data.success) {
                setBookings((prevBookings) => prevBookings.map((booking) => (booking._id === bookingId ? { ...booking, bookingStatus: "Cancelled" } : booking)));
                setIsLoading(false);
                toast.success("Booking Cancelled successfully!");
            } else {
                console.error("Error updating booking status:", response.data.message);
                toast.error("Error updating booking status");
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error updating booking status:", error);
            setIsLoading(false);
            toast.error("Error updating booking status");
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div className="text-center py-10 text-red-500 font-semibold">Oops! Something went wrong</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-10 text-primaryColor">Manage Bookings</h1>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                    <div key={booking._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 text-left">
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <h2 className="text-xl font-bold text-primaryColor truncate">{booking.serviceTitle}</h2>
                                <span
                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${booking.bookingStatus === "Pending"
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
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Client:</span> {booking.clientName}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Address:</span> {booking.clientAddress}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Description:</span> {booking.description}
                                </p>
                            </div>
                            {(booking.bookingStatus === "Pending" || booking.bookingStatus === "Accepted") && (
                                <div className="pt-4">
                                    <button
                                        className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                        onClick={() => updateBookingStatus(booking._id)}
                                    >
                                        Cancel Booking
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientManageBookings;

