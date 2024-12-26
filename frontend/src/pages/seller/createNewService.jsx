import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/authContexts';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateNewService = () => {
    const navigate = useNavigate();
    const { userDetails } = useContext(AuthContext);

    const [serviceData, setServiceData] = useState({
        title: "",
        description: "",
        sellerName: userDetails.name,
        price: "",
        category: "",
        image: null,
    });
    const [bannerImgUrl, setBannerImgUrl] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create FormData instance
            const formData = new FormData();
            formData.append("userId", userDetails._id);
            formData.append("title", serviceData.title);
            formData.append("sellerName", serviceData.sellerName);
            formData.append("description", serviceData.description);
            formData.append("price", serviceData.price);
            formData.append("category", serviceData.category);

            if (serviceData.image) {
                formData.append("banner", serviceData.image); // Append the file
            }

            const response = await axios.post(
                "http://localhost:5000/api/service/create",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Required for file uploads
                    },
                }
            );

            if (response.data.success) {
                toast.success(response.data.message || "Service Created! Yey");
                navigate("/services");
            } else {
                toast.error("Something went wrong!");
            }
        } catch (err) {
            console.error("Error:", err.message);
            toast.error(err.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0]; // Get the first selected file
        if (file) {
            const imgUrl = URL.createObjectURL(file);
            setBannerImgUrl(imgUrl);
            setServiceData((prev) => ({ ...prev, image: file })); // Store the image URL
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setServiceData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <>
            <div className="min-h-screen">
                <form
                    className="bg-white shadow-lg rounded-lg p-6 w-full grid grid-cols-1 md:grid-cols-2 gap-10"
                    onSubmit={handleSubmit}
                >
                    <div className="text-left space-y-11">
                        {/* Title */}
                        <div className="mb-4">
                            <label className="block text-xl font-semibold text-gray-700">
                                Service Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={serviceData.title}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryColor focus:border-primaryColor"
                                placeholder="Enter service title"
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label className="block text-xl font-semibold text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={serviceData.description}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-4 py-2 h-[100px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryColor focus:border-primaryColor"
                                placeholder="Provide a detailed description"
                            ></textarea>
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                            <label className="block text-xl font-semibold text-gray-700">
                                Price (in $)
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={serviceData.price}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryColor focus:border-primaryColor"
                                placeholder="Set a price"
                            />
                        </div>

                        {/* Category */}
                        <div className="mb-4">
                            <label className="block text-xl font-semibold text-gray-700">
                                Category
                            </label>
                            <select
                                name="category"
                                value={serviceData.category}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryColor focus:border-primaryColor"
                                placeholder="Select a Category">
                                <option value="" disabled>Select a category...</option>
                                <option value="Cleaning">Cleaning</option>
                                <option value="Gardening">Gardening</option>
                                <option value="Plumbing">Plumbing</option>
                                <option value="Electrical">Electrical</option>

                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-primaryColor text-white py-2 px-4 rounded-md hover:bg-secondaryColor focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-2"
                        >
                            <i class="fa-solid fa-plus"></i> Create Service
                        </button>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4 overflow-hidden">
                        <label className="block text-xl font-semibold text-gray-700">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            required
                            className="mt-1 block file:cursor-pointer w-full text-lg text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-lg file:font-semibold file:bg-blue-50 file:text-primaryColor hover:file:bg-gray-100"
                        />
                        {/* Display the uploaded image */}
                        {serviceData.image && (
                            <img
                                src={bannerImgUrl} // Use the temporary URL
                                alt="Uploaded Preview"
                                className="mt-2 border rounded object-cover"
                            />
                        )}
                    </div>

                    {/* Submit Button */}

                </form>
            </div>
        </>
    )
}

export default CreateNewService