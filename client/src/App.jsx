import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProfile from "./components/admin/AdminProfile";
import ItemListing from "./components/itemLIsting/ItemListing";
import Home from "./pages/Home";
import AdminLogin from "./components/admin/AdminLogin";
import AdminRegister from "./components/admin/AdminRegister";
import PrivateRoutes from "./components/admin/PrivateRoutes";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<AdminLogin />} />
        <Route path="register" element={<AdminRegister />} />
        <Route element={<PrivateRoutes />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile/:id" element={<AdminProfile />} />
        </Route>
        <Route path="items" element={<ItemListing />} />
      </Routes>
    </Router>
  );
};

export default App;
