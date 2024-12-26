import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../contexts/authContexts'
import Loader from '../../components/loader'


const SellerDashboard = () => {

    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [earnings, setEarnings] = useState(0);
    const { userDetails } = useContext(AuthContext);


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

        const fetchEarnings = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/booking/getSellerEarnings/${userDetails._id}`);
                setEarnings(response.data.earnings || 0);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching earnings:", error);
                setIsError(true);
                setIsLoading(false);
            }
        };

        fetchBookings();
        fetchEarnings();
        console.log(bookings);
    }, []);


    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div className="text-center py-10 text-red-500">Oops! Something went wrong</div>;
    }

    return (
        <div className="w-1/2 bg-white rounded-xl shadow-lg flex flex-col text-left p-6 gap-4">
            <h1 className="text-2xl font-semibold text-gray-800">Total Earnings:</h1>
            <p className="text-4xl font-semibold text-gray-700">${earnings}</p>

            <h1 className="text-2xl font-semibold text-gray-800">Recent Bookings</h1>
            <div className="grid grid-cols-1 gap-3">
                {bookings.map(booking => (
                    <div key={booking._id} className="bg-gray-50 rounded-lg p-3 flex gap-3 justify-between border border-gray-200">
                        <h1 className="text-xl font-bold text-primaryColor">{booking.serviceTitle}</h1>
                        <p><span
                            className={`px-3 py-1 rounded-md text-sm font-semibold ${booking.bookingStatus === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : booking.bookingStatus === "Accepted"
                                    ? "bg-blue-100 text-blue-700"
                                    : booking.bookingStatus === "Completed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                }`}
                        >
                            {booking.bookingStatus}
                        </span></p>
                    </div>
                ))}


            </div>
        </div>
    )
}

export default SellerDashboard