import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, userDetails, setUserDetails }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
