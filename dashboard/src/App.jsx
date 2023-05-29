import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Customers from "./pages/Customers";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";
import UserDetails from "./pages/UserDetails";
import ProductProvider from "./contexts/ProductContext";
import UserProvider from "./contexts/UserContext";

const App = () => {
  return (
    <ProductProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/admin" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<Customers />} />
              <Route path="users/:id" element={<UserDetails />} />
              <Route path="products" element={<ProductList />} />
              <Route path="products/:id" element={<ProductDetails />} />
              <Route path="products/new" element={<AddProduct />} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </ProductProvider>
  );
};

export default App;
