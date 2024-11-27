
const ServiceCard = ({ image, title, description, price, sellerName, onContactClick }) => {
    return (
        <div className="max-w-sm rounded-lg shadow-lg bg-white overflow-hidden">
            {/* Card Image */}
            <img src={image} alt="service" className="w-full h-56 object-cover" />

            <div className="p-4 text-start">
                {/* Service Title */}
                <h2 className="text-lg font-semibold text-gray-900 truncate">{title}</h2>

                {/* Seller Name */}
                <p className="text-sm text-gray-600">By {sellerName}</p>

                {/* Service Description */}
                <p className="text-sm text-gray-700 mt-2">{description}</p>

                {/* Price */}
                <p className="text-xl font-bold text-primaryColor mt-3">${price}</p>

                {/* Button to contact or view */}
                <button
                    onClick={onContactClick}
                    className="w-full py-2 px-4 mt-4 bg-primaryColor text-white rounded-md hover:bg-secondaryColor focus:outline-none">
                    Contact Seller
                </button>
            </div>
        </div>
    );
};

export default ServiceCard;
