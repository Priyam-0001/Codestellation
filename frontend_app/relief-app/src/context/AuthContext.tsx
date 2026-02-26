import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api, { setAuthToken } from "../api/api";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedRole = await AsyncStorage.getItem("role");

      if (storedToken && storedRole) {
        setToken(storedToken);
        setUserRole(storedRole);
        setAuthToken(storedToken);
      }
      setLoading(false);
    };

    loadAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    const { token, role } = res.data;

    setToken(token);
    setUserRole(role);
    setAuthToken(token);

    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("role", role);

    return role;
  };

  const logout = async () => {
    setToken(null);
    setUserRole(null);
    setAuthToken(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ userRole, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};