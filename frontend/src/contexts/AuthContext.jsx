import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    // Mock login implementation
    setTimeout(() => {
      setUser({ email, name: 'Usuario Demo' });
      setLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (email, password, name) => {
    setLoading(true);
    // Mock register implementation
    setTimeout(() => {
      setUser({ email, name });
      setLoading(false);
    }, 1000);
  };

  const value = {
    user,
    login,
    logout,
    register,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
