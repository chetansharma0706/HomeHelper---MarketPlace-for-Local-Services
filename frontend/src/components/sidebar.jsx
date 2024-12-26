import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="w-[22%] bg-primaryColor text-white flex flex-col rounded-l-xl">
            <nav className="flex-1 px-6 py-4 space-y-4 text-xl text-left">
                {/* Dashboard */}
                <NavLink
                    to="/seller/seller-dashboard"
                    className={({ isActive }) =>
                        `block py-2 px-4 rounded hover:bg-secondaryColor mt-3 ${isActive ? 'bg-secondaryColor' : ''
                        }`
                    }
                ><i class="ri-dashboard-fill"></i> Dashboard
                </NavLink>
                {/* Manage Services */}
                <NavLink
                    to="/seller/manage-services"
                    className={({ isActive }) =>
                        `block py-2 px-4 rounded hover:bg-secondaryColor ${isActive ? 'bg-secondaryColor' : ''
                        }`
                    }
                ><i class="ri-service-fill"></i> Manage Services
                </NavLink>
                {/* Add new Services */}
                <NavLink
                    to="/seller/create-new-service"
                    className={({ isActive }) =>
                        `block py-2 px-4 rounded hover:bg-secondaryColor ${isActive ? 'bg-secondaryColor' : ''
                        }`
                    }
                ><i class="ri-add-line"></i> Add New Services
                </NavLink>
                {/* Manage Bookings */}
                <NavLink
                    to="/seller/manage-bookings"
                    className={({ isActive }) =>
                        `block py-2 px-4 rounded hover:bg-secondaryColor ${isActive ? 'bg-secondaryColor' : ''
                        }`
                    }
                ><i class="ri-menu-add-fill"></i> Manage Bookings
                </NavLink>

            </nav>
        </aside>
    );
};

export default Sidebar;
