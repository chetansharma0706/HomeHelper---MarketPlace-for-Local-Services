import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { defaultProfile } from "../assets/assets";
import { AuthContext } from "../contexts/authContexts";

const Navbar = () => {
  const { isLogin, userDetails, setIsLogin } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDDMenu, setIsProfileDDMenu] = useState(false); // profile dropdown
  const toggleDDMenu = () => setIsProfileDDMenu(!isProfileDDMenu);
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
            <Link
              to="/services"
              className="text-primaryColor hover:text-secondaryColor px-4 py-2"
            >
              Services<i className="ri-arrow-down-s-line"></i>
            </Link>
            <a
              href="#"
              className="text-primaryColor hover:text-secondaryColor px-4 py-2"
            >
              About us
            </a>
            {isLogin ? <div className="flex items-center gap-1 cursor-pointer group relative px-4" onClick={() => toggleDDMenu()}>
              <img className="w-10 h-10 rounded-full" src={defaultProfile} alt="Profile" />
              <i class={isProfileDDMenu ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}></i>
              {isProfileDDMenu && <div className="absolute top-16 right-0 p-2 w-80 flex flex-col items-start gap-1 bg-white shadow-md rounded-lg text-slate-800 ">
                <h4 className="text-md font-bold p-2">Welcome, {userDetails?.name}{userDetails.isSeller && " (Seller)"}</h4>
                {/* <a href="#" className="px-2 py-1 w-full text-left hover:bg-gray-100 rounded-md"><i class="ri-edit-line px-1"></i> Edit Profile</a> */}
                <a href="#" onClick={() => setIsLogin(false)} className="px-2 py-1 w-full text-left hover:bg-gray-100 rounded-md"><i class="ri-logout-box-line px-1"></i> Sign Out</a>
              </div>}

            </div> : <><a
              href="#"
              className="text-primaryColor hover:text-secondaryColor px-4 py-2"
            >
              Become a Seller
            </a>
              <Link
                to="/signin"
                className="bg-primaryColor text-white rounded-full px-6 py-2 hover:bg-secondaryColor"
              >
                Sign In <i className="ri-arrow-right-line"></i>
              </Link></>
            }

          </div>

          {/* Hamburger Menu Button */}
          {isLogin ? <div className="flex items-center gap-1 cursor-pointer group relative px-4 md:hidden" onClick={() => toggleDDMenu()}>
            <img className="w-10 h-10 rounded-full" src={defaultProfile} alt="Profile" />
            <i class={isProfileDDMenu ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}></i>
            {isProfileDDMenu && <div className="absolute top-16 right-0 p-2 w-40 flex flex-col items-start gap-1 bg-white shadow-md rounded-lg text-slate-800">
              <h4 className="text-lg font-bold">{userDetails?.name}</h4>
              <a href="#" className="px-2 py-1 w-full text-left hover:bg-gray-100 rounded-md"><i class="ri-edit-line px-1"></i> Edit Profile</a>
              <a href="#" onClick={() => setIsLogin(false)} className="px-2 py-1 w-full text-left hover:bg-gray-100 rounded-md"><i class="ri-logout-box-line px-1"></i> Sign Out</a>
            </div>}

          </div> : <div
            id="menu-icon"
            className="block md:hidden text-2xl cursor-pointer"
            onClick={toggleMenu}
          >
            <i
              className={isMenuOpen ? "ri-close-large-line" : "ri-menu-3-line"}
            ></i>
          </div>}


        </div>

        {/* Hamburger Menu - Slide down on smaller screens */}
        <div
          id="menu"
          className={`absolute w-full z-10 bg-white flex-col items-start gap-3 p-4 transition-all ease-in-out duration-300 md:hidden ${isMenuOpen ? "flex flex-grow" : "hidden"
            }`}
        >
          <Link
            to="/services"
            className="text-primaryColor hover:text-secondaryColor px-4 py-2"
          >
            Services<i className="ri-arrow-down-s-line"></i>
          </Link>
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
            Become a Helper
          </a>
          <Link
            to="signin"
            className="bg-primaryColor text-white rounded-full px-6 py-2 hover:bg-secondaryColor"
          >
            Sign In <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>
    </nav >
  );
};

export default Navbar;
