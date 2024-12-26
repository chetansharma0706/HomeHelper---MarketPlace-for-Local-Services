import React, { useState, useEffect } from 'react';
import ServiceCard from '../components/serviceCard';
import { toast } from 'react-toastify';
import axios from 'axios'
import Loader from '../components/loader';

const ServicesPage = () => {
    // Service data (could be fetched from an API or use local data)
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)


    console.log(services);

    useEffect(() => {
        const getAllServices = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get("http://localhost:5000/api/service/getAllServices");
                if (response.data.success) {
                    setServices(response.data.AllServices);
                    setIsLoading(false)
                } else {
                    console.log("error in fetching services from database");
                    setIsLoading(false)
                    setIsError(true)
                }
            } catch (err) {
                console.log(err.message);
                setIsLoading(false)
                setIsError(true)

            }
        }

        getAllServices();
    }, [])

    // State for filtering
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Function to filter services by category
    const filteredServices = services.filter(service =>
        selectedCategory === 'All' || service.category === selectedCategory
    );


    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div className="text-center py-10 text-red-500">Oops! Something went wrong</div>;
    }


    return (
        <>
            <div className="p-6 mt-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-semibold leading-tight md:text-5xl text-start">
                    </h1>
                    <p className="text-5xl mx-auto w-2/3 text-gray-900 font-semibold" >Explore a wide range of services from top sellers</p>
                </div>

                {/* Filter Dropdown */}
                <div className="text-start mb-6">
                    <label htmlFor="category" className="text-gray-700 font-semibold mb-2 mr-2">
                        Filter by Category:
                    </label>
                    <select
                        id="category"
                        className="outline-none w-54 text-sm px-2 py-2 border border-gray-300 rounded-xl"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        value={selectedCategory}
                    >
                        <option value="All">All Categories</option>
                        <option value="Cleaning">Cleaning</option>
                        <option value="Gardening">Gardening</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Electrical">Electrical</option>
                        {/* Add more categories here */}
                    </select>
                </div>

                {/* Service Cards */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 mt-3">
                    {filteredServices.map(service => (
                        <ServiceCard
                            key={service._id}
                            id={service._id}
                            image={service.bannerImage}
                            title={service.title}
                            description={service.description}
                            price={service.price}
                            sellerName={service.sellerName}
                            onContactClick={() => toast(`Contacting ${service.sellerName}...`)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ServicesPage;
