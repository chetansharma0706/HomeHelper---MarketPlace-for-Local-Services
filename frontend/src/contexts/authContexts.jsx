import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const autoLogin = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/auth/login-me", { withCredentials: true });
                if (response.data.success) {
                    setIsLogin(true);
                    setUserDetails(response.data.user); // Set user details

                }
            } catch (err) {
                setIsLogin(false);
                setUserDetails(null);
            }
        };

        autoLogin(); // Check for user authentication on app load
    }, []);


    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, userDetails, setUserDetails }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
