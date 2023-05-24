import React from "react";
import './App.scss'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProfile from "./components/admin/AdminProfile";
import ItemListing from "./components/itemLIsting/ItemListing";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import MainLayout from "./layouts/MainLayout";
import PrivateRoutes from "./components/admin/PrivateRoutes";
import Products from "./pages/products/Products";
import Cart from "./pages/cart/Cart";


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        {/* <Route path="products" element={<ItemListing />} /> */}
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<Cart />} />
      </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* <Route element={<PrivateRoutes />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile/:id" element={<AdminProfile />} />
        </Route> */}
      </Routes>
    </Router>
  );
};

export default App;
