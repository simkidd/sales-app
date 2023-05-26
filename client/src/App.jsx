import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import MainLayout from "./layouts/MainLayout";
import PrivateRoutes from "./components/private/PrivateRoutes";
import Products from "./pages/products/Products";
import Cart from "./pages/cart/Cart";
import ProductDetails from "./pages/products/ProductDetails";
import AuthProvider from "./contexts/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="product/:_id" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
          </Route>
          <Route path="account/login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route element={<PrivateRoutes />}>
            {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
