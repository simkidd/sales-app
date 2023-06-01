import React, { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  
  return token ? <Outlet /> : <Navigate to="/account/login" />;
};

export default ProtectedRoutes;
