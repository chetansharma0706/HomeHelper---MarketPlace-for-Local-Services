import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../contexts/authContexts'
import Loader from '../../components/loader'
import { toast } from 'react-toastify'

const ManageServices = () => {
    const navigate = useNavigate();
    const { userDetails } = useContext(AuthContext);
    const [userServices, setUserServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)


    console.log(userServices);

    useEffect(() => {
        const getUserServices = async () => {
            try {
                setIsLoading(true)
                const response = await axios.post("http://localhost:5000/api/service/getUserServices", { userId: userDetails._id });
                if (response.data.success) {
                    setUserServices(response.data.userServices);
                    setIsLoading(false)
                } else {
                    console.log("error in fetching User services from database");
                    setIsLoading(false)
                    setIsError(true)
                }
            } catch (err) {

                console.log(err.message);
                setIsLoading(false)
                setIsError(true)

            }
        }

        getUserServices();
    }, [userDetails._id])


    const deleteService = async (serviceId) => {
        try {
            setIsLoading(true)
            const response = await axios.delete(`http://localhost:5000/api/service/deleteService/${serviceId}`);
            if (response.data.success) {
                setUserServices((prevServices) => prevServices.filter((service) => service._id !== serviceId));
                setIsLoading(false)
                console.log("Service deleted successfully!");
                toast.success("Service deleted successfully!");
            } else {
                console.error("Error deleting service:", response.data.message);
                setIsLoading(false)
                toast.error("Error deleting service");
            }
        } catch (error) {
            console.error("Error deleting service:", error);
            setIsLoading(false)
            toast.error("Error deleting service");
        }
    }


    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div className="text-center py-10 text-red-500">Oops! Something went wrong</div>;
    }

    return (
        <>
            <div className="mt-8 p-6">
                {/* Heading */}
                <h1 className="text-4xl font-bold text-primaryColor mb-6">Your Services</h1>
                {/* Service Cards */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 sm:gap-6 mt-3">
                    {userServices.map(service => (
                        <div className="max-w-sm rounded-xl shadow-2xl bg-white overflow-hidden cursor-pointer" key={service._id}
                        >
                            {/* Card Image */}
                            <img src={service.bannerImage} alt="service" className="w-full h-56 object-cover" />

                            <div className="p-4 text-start space-y-3">
                                {/* Service Title */}
                                <h2 className="text-xl font-semibold text-gray-900 truncate">{service.title}</h2>

                                {/* Seller Name */}
                                <div className="flex items-center gap-2 text-yellow-500 text-sm">
                                    <div className="flex items-center">
                                        <img src={`https://ui-avatars.com/api/?name=${service.sellerName.replace(" ", "+")}&background=random&font-size=0.5&bold=true`} alt="profilePhoto" className="w-6 h-6 rounded-full" />
                                        <span className="font-semibold ml-2 text-gray-800">by {service.sellerName}</span>
                                    </div>
                                    <div className="flex">
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                    </div>
                                </div>

                                {/* Service Description */}
                                <p className="text-sm text-gray-700 mt-2">{service.description.substring(0, 50) + "..."}</p>

                                {/* Price */}
                                <p className="text-xl font-bold text-primaryColor mt-3">${service.price}</p>

                                {/* Button to contact or view */}
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => navigate(`/service/${service._id}`)}
                                        className="w-full py-2 px-4 mt-4 bg-primaryColor text-white rounded-md hover:bg-secondaryColor focus:outline-none">
                                        Preview
                                    </button>
                                    <button
                                        onClick={() => deleteService(service._id)}
                                        className="w-full py-2 px-4 mt-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ManageServices