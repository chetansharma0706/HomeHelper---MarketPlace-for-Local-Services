import React, { useState } from 'react';
import ServiceCard from '../components/serviceCard';
import Navbar from '../components/navbar';
import { toast } from 'react-toastify';
const ServicesPage = () => {
    // Service data (could be fetched from an API or use local data)
    const services = [
        {
            id: 1,
            image: "https://cdn.prod.website-files.com/640051ce8a159067e1042e74/65d5b19950d874f282b5c35f_woman-with-gloves-cleaning-floor_23-2148520978.jpg",
            title: "House Cleaning",
            description: "Deep cleaning for your home or office space",
            price: "50",
            sellerName: "Nikky Chan",
            category: "Cleaning",
        },
        {
            id: 2,
            image: "https://www.creative-gardens.co.za/wp-content/uploads/2023/01/Green-Beige-Modern-Professional-Lawn-Care-And-Gardening-Service-Instagram-Post-1024x1024.webp",
            title: "Garden Maintenance",
            description: "Mowing, trimming, and maintenance of gardens",
            price: "30",
            sellerName: "John Smith",
            category: "Gardening",
        },
        {
            id: 3,
            image: "https://www.valetgroups.com/service_images/19serone.jpg",
            title: "Plumbing Services",
            description: "Fix your plumbing issues with professional services",
            price: "70",
            sellerName: "Mike Johnson",
            category: "Plumbing",
        },
        {
            id: 4,
            image: "https://hometriangle.com/blogs/content/images/2024/08/hometriangle-blog-electrical-repairs.jpg",
            title: "Electrical Repairs",
            description: "Get your electrical issues fixed by licensed experts",
            price: "80",
            sellerName: "Sarah Lee",
            category: "Electrical",
        },
        {
            id: 5,
            image: "https://nitzcleaning.ca/cdn/shop/files/nitzcover_34f66f33-4877-40b7-9595-56bc580c2eee.png?v=1700263735",
            title: "House Cleaning",
            description: "Deep cleaning for your home or office space",
            price: "50",
            sellerName: "Jane Doe",
            category: "Cleaning",
        },
        {
            id: 6,
            image: "https://d17x34b9fcvxk7.cloudfront.net/static/marketing/images/hero-backgrounds/gardener.jpg",
            title: "Garden Maintenance",
            description: "Mowing, trimming, and maintenance of gardens",
            price: "30",
            sellerName: "John Smith",
            category: "Gardening",
        },
        {
            id: 7,
            image: "https://housing.com/news/wp-content/uploads/2023/03/Plumbing-services-Know-types-and-how-to-choose-01.png",
            title: "Plumbing Services",
            description: "Fix your plumbing issues with professional services",
            price: "70",
            sellerName: "Mike Johnson",
            category: "Plumbing",
        },
        {
            id: 8,
            image: "https://copperfield-electric.com/wp-content/uploads/2023/03/Black-and-Yellow-Modern-Electrical-Service-Facebook-Cover-2-1024x577.jpg",
            title: "Electrical Repairs",
            description: "Get your electrical issues fixed by licensed experts",
            price: "80",
            sellerName: "Sarah Lee",
            category: "Electrical",
        },
        // More services here...
    ];

    // State for filtering
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Function to filter services by category
    const filteredServices = services.filter(service =>
        selectedCategory === 'All' || service.category === selectedCategory
    );

    return (
        <>
            <Navbar />
            <div className="p-6 mt-24">
                <div className="mb-6">
                    <h1 className="text-3xl font-semibold leading-tight md:text-5xl text-start">
                    </h1>
                    <p className="text-5xl mx-auto w-2/3 text-gray-900 font-semibold" >Explore a wide range of services from top sellers</p>
                </div>

                {/* Filter Dropdown */}
                <div className="mb-6">
                    <label htmlFor="category" className="text-gray-700 font-semibold mb-2">
                        Filter by Category:
                    </label>
                    <select
                        id="category"
                        className="outline-none w-64 px-4 py-2 border border-gray-300 rounded-md"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-3">
                    {filteredServices.map(service => (
                        <ServiceCard
                            key={service.id}
                            image={service.image}
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
