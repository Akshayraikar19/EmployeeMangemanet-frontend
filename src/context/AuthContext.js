// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 

    const handleLogin = () => {
      
        setUser({ isLoggedIn: true, username: 'steve', role: 'admin' }); 
    };

    const handleLogout = () => {
        
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
