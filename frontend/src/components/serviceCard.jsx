import { useNavigate } from "react-router-dom"
import { defaultProfile } from "../assets/assets";


const ServiceCard = ({ image, title, description, price, sellerName, onContactClick, id }) => {
    const navigate = useNavigate();
    return (
        <div className="max-w-sm rounded-xl shadow-2xl bg-white overflow-hidden cursor-pointer" onClick={() => navigate(`/service/${id}`)}
        >
            {/* Card Image */}
            <img src={image} alt="service" className="w-full h-56 object-cover" />

            <div className="p-4 text-start space-y-3">
                {/* Service Title */}
                <h2 className="text-xl font-semibold text-gray-900 truncate">{title}</h2>

                {/* Seller Name */}
                <div className="flex items-center gap-2 text-yellow-500 text-sm">
                    <div className="flex items-center">
                        <img src={`https://ui-avatars.com/api/?name=${sellerName.replace(" ", "+")}&background=random&font-size=0.5&bold=true`} alt="profilePhoto" className="w-6 h-6 rounded-full" />
                        <span className="font-semibold ml-2 text-gray-800">by {sellerName}</span>
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
                <p className="text-sm text-gray-700 mt-2">{description.substring(0, 50) + "..."}</p>

                {/* Price */}
                <p className="text-xl font-bold text-primaryColor mt-3">${price}</p>

                {/* Button to contact or view */}
                <button
                    onClick={onContactClick}
                    className="w-full py-2 px-4 mt-4 bg-primaryColor text-white rounded-md hover:bg-secondaryColor focus:outline-none">
                    Schedule a Visit
                </button>
            </div>
        </div>
    );
};

export default ServiceCard;
