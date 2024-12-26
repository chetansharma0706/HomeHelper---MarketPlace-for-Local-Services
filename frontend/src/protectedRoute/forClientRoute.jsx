import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContexts';
import { toast } from 'react-toastify';

const ForClientRoute = ({ children }) => {
    const { isLogin, userDetails } = useContext(AuthContext);

    // Debug: Check the current state
    console.log('isLogin:', isLogin);
    console.log('userDetails:', userDetails);

    // Redirect to sign-in if not logged in
    if (!isLogin) {
        toast.error("Please Login for making request")
        return <Navigate to="/signin" replace />;
    }

    // Redirect to home if userDetails is missing or not a client
    if (!userDetails || userDetails.isSeller) {
        toast.error("Seller Account cannot make an Booking request")
        return <Navigate to="/" replace />;
    }

    // Allow access if checks pass
    return children;
};

export default ForClientRoute;
