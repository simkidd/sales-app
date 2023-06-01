import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiConfig from "../utils/apiConfig";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { base_url } = apiConfig;

  useEffect(() => {
    // Check if user is authenticated on component mount
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      }
    };

    checkAuthStatus();
  }, []);

  // Function to handle login
  const login = async () => {
    try {
      const res = await axios.post(`${base_url}/login`, {
        email,
        password,
      });

      const user = res.data.user;

      localStorage.setItem("token", res.data.token);
      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(user)); // Store the user data in local storage

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.response.data.error}`);
    }
  };

  // Function to handle logout
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
      }}
    >
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
