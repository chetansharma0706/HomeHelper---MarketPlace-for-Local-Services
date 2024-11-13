import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="w-full fixed top-0 left-0 z-10 border-b border-gray-200 bg-white">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between py-4 px-4">
          {/* logo div */}
          <div className="pt-2 ml-3">
            <Link to="/" className="text-2xl font-extrabold text-gray-800">
              <span className="text-primaryColor">
                <i className="ri-home-smile-line"></i> House
              </span>
              Helper
            </Link>
          </div>
          {/* logo div end */}

          {/* other links div */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#"
              className="text-primaryColor hover:text-secondaryColor px-4 py-2"
            >
              Services<i className="ri-arrow-down-s-line"></i>
            </a>
            <a
              href="#"
              className="text-primaryColor hover:text-secondaryColor px-4 py-2"
            >
              About us
            </a>
            <a
              href="#"
              className="text-primaryColor hover:text-secondaryColor px-4 py-2"
            >
              Become a Partner
            </a>
            <Link
              to="/signin"
              className="bg-primaryColor text-white rounded-full px-6 py-2 hover:bg-secondaryColor"
            >
              Sign In <i className="ri-arrow-right-line"></i>
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <div
            id="menu-icon"
            className="block md:hidden text-2xl cursor-pointer"
            onClick={toggleMenu}
          >
            <i
              className={isMenuOpen ? "ri-close-large-line" : "ri-menu-3-line"}
            ></i>
          </div>
        </div>

        {/* Hamburger Menu - Slide down on smaller screens */}
        <div
          id="menu"
          className={`absolute w-full z-10 bg-white flex-col items-start gap-3 p-4 transition-all ease-in-out duration-300 md:hidden ${isMenuOpen ? "flex flex-grow" : "hidden"
            }`}
        >
          <a
            href="#"
            className="text-primaryColor hover:text-secondaryColor px-4 py-2"
          >
            Services<i className="ri-arrow-down-s-line"></i>
          </a>
          <a
            href="#"
            className="text-primaryColor hover:text-secondaryColor px-4 py-2"
          >
            About us
          </a>
          <a
            href="#"
            className="text-primaryColor hover:text-secondaryColor px-4 py-2"
          >
            Become a Partner
          </a>
          <Link
            to="signin"
            className="bg-primaryColor text-white rounded-full px-6 py-2 hover:bg-secondaryColor"
          >
            Sign In <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
