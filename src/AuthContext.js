import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const res = await axios.get(`http://localhost:3001/users/${userId}`);
          setUser(res.data);
          setIsLoggedIn(true);
        } catch (err) {
          console.error('Error verifying user:', err);
          localStorage.removeItem('userId');
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (userId) => {
    localStorage.setItem('userId', userId);
    setIsLoggedIn(true);
    const res = await axios.get(`http://localhost:3001/users/${userId}`);
    setUser(res.data);
  };

  const logout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Export AuthContext
export { AuthContext };