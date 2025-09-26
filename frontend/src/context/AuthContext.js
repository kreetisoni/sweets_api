import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // stores user info (username + role)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore token + user from localStorage if present
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));

    setLoading(false);
  }, []);

  // login function: stores token + user in context and localStorage
  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  // logout function: clears token + user from context and localStorage
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, setToken, setUser, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
