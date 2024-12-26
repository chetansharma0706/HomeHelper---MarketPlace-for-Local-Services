import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import Home from "./pages/home";
import { ToastContainer } from "react-toastify";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ServicesPage from "./pages/services";
import Service from "./pages/service";
import Navbar from "./components/navbar";
import CreateNewService from "./pages/seller/createNewService";
import ProtectedRoute from "./protectedRoute/protectedRoute";
import Sidebar from "./components/sidebar";
import ManageServices from "./pages/seller/manageServices";
import ManageBookings from "./pages/seller/manageBookings";
import SellerDashboard from "./pages/seller/sellerDashboard";
import ForClientRoute from "./protectedRoute/forClientRoute";
import CreateBookingRequest from "./pages/customer/createBookings";
import ClientManageBookings from "./pages/customer/clientmanageBooking";

function App() {

  return (
    <>
      <Router>
        {/* Navbar and ToastContainer accessible throughout the app */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Navbar />
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/service/:id" element={<Service />} />
          {/* <Route path="/settings" element={<Settings />} /> */}

          {/* Seller-Specific Routes */}
          <Route
            path="/seller/*"
            element={
              <ProtectedRoute>
                <SellerLayout />
              </ProtectedRoute>
            }
          />

          {/* client-Specific Routes */}
          <Route
            path="/client/*"
            element={
              <ForClientRoute>
                <ClientLayout />
              </ForClientRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

/* Seller Layout Component */
const SellerLayout = () => {
  return (
    <div className="h-screen bg-gray-100 flex mt-6 rounded-xl">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-scroll">
        <Routes>
          <Route path="seller-dashboard" element={<SellerDashboard />} />
          <Route path="manage-services" element={<ManageServices />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
          <Route path="create-new-service" element={<CreateNewService />} />
        </Routes>
      </main>
    </div>
  );
};


/* Client Layout Component */
const ClientLayout = () => {
  return (
    <Routes>
      <Route path="create-booking/:serviceTitle/:serviceId" element={<CreateBookingRequest />} />
      <Route path="manage-booking" element={<ClientManageBookings />} />
    </Routes>
  );
};