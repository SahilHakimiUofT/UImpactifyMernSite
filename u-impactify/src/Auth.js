import React, { useEffect, useState } from "react";
import app from "./config/firebase";

export const AuthContext = React.createContext();


export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userType, setUserType] = useState('');

    useEffect(() => {
        app.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                userType,
                setUserType,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};