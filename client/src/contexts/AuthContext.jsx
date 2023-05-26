import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiConfig from "../utils/apiConfig";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { base_url } = apiConfig;

  // Function to handle login
  const login = async () => {
    try {
      const res = await axios.post(`${base_url}/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      console.log(res.data)
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  // Function to handle logout
  const logout = () => {
    // Perform logout logic here
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        email,
        setEmail,
        password,
        setPassword,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
