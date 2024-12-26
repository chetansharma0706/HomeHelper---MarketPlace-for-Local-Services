import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/authContexts';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const CreateBookingRequest = () => {
    const navigate = useNavigate();
    const { userDetails } = useContext(AuthContext);
    const { serviceId, serviceTitle } = useParams(); // Get the dynamic ID from the URL
    const decodedServiceTitle = decodeURIComponent(serviceTitle);


    const [bookingData, setBookingData] = useState({
        serviceId: serviceId,
        serviceTitle: decodedServiceTitle,
        clientName: userDetails.name,
        description: "",
        clientId: userDetails._id,
        clientAddress: "",
        price: 0,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/booking/create",
                bookingData);

            if (response.data.success) {
                toast.success(response.data.message || "Request made Succesfully!");
                navigate(`/service/${serviceId}`);
            } else {
                toast.error("Something went wrong!");
            }

        } catch (err) {
            console.error("Error:", err.message);
            toast.error(err.response?.data?.message || "An error occurred. Please try again.");
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                <form
                    className="bg-white shadow-lg rounded-lg p-6 w-full grid grid-cols-1 md:grid-cols-2 gap-10"
                    onSubmit={handleSubmit}
                >
                    <div className="text-left space-y-11">

                        {/* Description */}
                        <div className="mb-4">
                            <label className="block text-xl font-semibold text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={bookingData.description}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-4 py-2 h-[100px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryColor focus:border-primaryColor"
                                placeholder="Provide a detailed description of your problem"
                            ></textarea>
                        </div>

                        {/* Address */}
                        <div className="mb-4">
                            <label className="block text-xl font-semibold text-gray-700">
                                Your Exact Address
                            </label>
                            <input
                                type="text"
                                name="clientAddress"
                                value={bookingData.clientAddress}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryColor focus:border-primaryColor"
                                placeholder="Enter your Address"
                            />
                        </div>
                        {/* Time Slot
                        <div className="mb-4">
                            <label className="block text-xl font-semibold text-gray-700">
                                Preferred Time Slot
                            </label>
                            <input
                                type="time"
                                name="timeSlot"
                                value={bookingData.timeSlot}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryColor focus:border-primaryColor"
                            />
                        </div> */}


                        <button
                            type="submit"
                            className="bg-primaryColor text-white py-2 px-4 rounded-md hover:bg-secondaryColor focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-2"
                        > Book Now
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default CreateBookingRequest