import React, { createContext, useState } from "react";
import api, { setAuthToken } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setToken(res.data.token);
    setUserRole(res.data.role);
    setAuthToken(res.data.token);
    return res.data.role;
  };

  const logout = () => {
    setToken(null);
    setUserRole(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ userRole, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};