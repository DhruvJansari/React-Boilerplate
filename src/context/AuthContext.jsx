import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = async ({ name, email, password }) => {
    setAuthLoading(true);
    setError(null);

    try {
      const res = await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setAuthLoading(true);
    setError(null);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      return res.data.user;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // ignore backend failure
    }

    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        authLoading,
        error,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
