import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContexts';

const ProtectedRoute = ({ children }) => {
    const { isLogin, userDetails } = useContext(AuthContext);

    // Debug: Check the current state
    console.log('isLogin:', isLogin);
    console.log('userDetails:', userDetails);

    // Redirect to sign-in if not logged in
    if (!isLogin) {
        return <Navigate to="/" replace />;
    }

    // Redirect to home if userDetails is missing or not a seller
    if (!userDetails || !userDetails.isSeller) {
        return <Navigate to="/" replace />;
    }

    // Allow access if checks pass
    return children;
};

export default ProtectedRoute;
