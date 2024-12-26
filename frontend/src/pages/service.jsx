import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import Loader from "../components/loader";
const Service = () => {

    const navigate = useNavigate()
    const { id } = useParams(); // Get the dynamic ID from the URL
    console.log(id)

    const [service, setService] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    console.log(service)
    useEffect(() => {
        // Scroll to the top of the page when this component loads
        const getService = async () => {
            try {
                setIsLoading(true)
                const response = await axios.post(`http://localhost:5000/api/service/getService`, { serviceId: id });
                if (response.data.success) {
                    console.log(response.data)
                    setService(response.data.service)
                    setIsLoading(false)

                } else {
                    console.log(response.data.message);
                    setIsLoading(false)
                    setIsError(true)
                }
            } catch (err) {
                console.error(err.message)
                setIsLoading(false)
                setIsError(true)
            }
        }

        getService();
        window.scrollTo(0, 0);
    }, [id]); // Trigger whenever the ID (route parameter) changes
    console.log(service.title)

    const sellerName = service.sellerName || "Unknown Seller"; // Fallback to avoid crashes

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <div className="text-center py-10 text-red-500">Oops! Something went wrong</div>;
    }

    return (
        <>
            {isLoading ? <Loader /> : (
                <div>
                    {/* Breadcrumb Navigation */}
                    <nav className="text-sm text-start text-gray-500 my-8 px-4">
                        <Link to="/" className="hover:text-gray-800">HOME</Link> &gt;
                        <Link to="/services" className="hover:text-gray-800">  SERVICES</Link> &gt;
                        <span className="text-gray-600"> {service.title}</span>
                    </nav>

                    {/* Main Section */}
                    <div className="bg-white shadow-md text-center p-6 grid lg:grid-cols-2 gap-7 rounded-2xl">
                        {/* Left: Product Images */}
                        <div className="flex gap-2 flex-col">
                            <img
                                src={service.bannerImage}
                                alt="Main Product"
                                className="col-span-2 object-cover rounded-lg border border-gray-500"
                            />

                        </div>

                        {/* Right: Product Details */}
                        <div className="col-span-1 space-y-6 text-start mt-3">
                            <h1 className="text-4xl font-bold text-gray-800">
                                {service.title}
                            </h1>

                            <div className="flex items-center gap-2 text-yellow-500 text-lg">
                                <div className="flex items-center">
                                    <img src={`https://ui-avatars.com/api/?name=${sellerName.replace(" ", "+")}&background=random&font-size=0.5&bold=true`} alt="profilePhoto" className="w-6 h-6 rounded-full" />
                                    <span className="font-semibold ml-2 text-gray-800">by {service.sellerName}</span>
                                </div>
                                <div className="flex">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                                <span className="text-gray-500">(5 reviews)</span>
                            </div>
                            <p className="text-2xl font-semibold text-gray-800">{`$${service.price}`}</p>
                            {/* Service Overview */}
                            <section className="bg-white rounded-lg mt-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    Service Overview
                                </h2>
                                <p className="text-gray-600">
                                    {service.description}
                                    {/* Our professional home cleaning service ensures every corner of your
                            house is spotless, leaving it fresh and welcoming. */}
                                </p>

                                <button className="bg-primaryColor text-white py-2 px-4 mt-8 rounded hover:bg-secondaryColor" >
                                    <Link to={`/client/create-booking/${service.title}/${id}`}>Schedule a Visit</Link>
                                </button>
                            </section>
                        </div>
                    </div>

                    {/* Description & Reviews */}
                    <div className="bg-white shadow-md text-start mt-6 p-6">
                        <div className="border-b pb-4">
                            <button className="text-blue-600 font-semibold border-b-2 border-blue-600">
                                Description
                            </button>
                            <button className="text-gray-500 ml-6 hover:text-blue-600">
                                Reviews (5)
                            </button>
                        </div>
                        <p className="mt-4 text-gray-700">
                            {service.description}
                        </p>
                    </div>

                    {/* Recommended Products */}

                    {/* Service Cards */}

                    {/* <div>
                <h1 className="text-xl mt-10 mb-8 font-semibold leading-tight md:text-5xl text-start">
                    You May Also Like
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-3">
                    {services.map(service => (
                        <ServiceCard
                            key={service.id}
                            id={service.id}
                            image={service.image}
                            title={service.title}
                            description={service.description}
                            price={service.price}
                            sellerName={service.sellerName}
                            onContactClick={() => toast(`Contacting ${service.sellerName}...`)}
                        />
                    ))}
                </div>
            </div> */}
                </div >
            )}
        </>
    );
};

export default Service;
