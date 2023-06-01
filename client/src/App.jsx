import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import "./components/breadcrumb/breadcrumb.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import MainLayout from "./layouts/MainLayout";
import Products from "./pages/products/Products";
import Cart from "./pages/cart/Cart";
import ProductDetails from "./pages/products/ProductDetails";
import AuthProvider from "./contexts/AuthContext";
import CartProvider from "./contexts/CartContext";
import UserDashboard from "./pages/userDashboard/UserDashboard";
import Profile from "./components/profile/Profile";
import Wishlist from "./components/wishlist/Wishlist";
import ProtectedRoutes from "./private/ProtectedRoutes";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="product/:_id" element={<ProductDetails />} />
              <Route path="cart" element={<Cart />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="account" element={<UserDashboard />}>
                  <Route path="profile" element={<Profile />} />
                  <Route path="wishlist" element={<Wishlist />} />
                </Route>
              </Route>
            </Route>
            <Route path="account/login" element={<Login />} />
            <Route path="account/register" element={<Register />} />
          </Routes>
        </AuthProvider>
      </Router>
    </CartProvider>
  );
};

export default App;
