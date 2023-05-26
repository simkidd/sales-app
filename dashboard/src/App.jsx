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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="product-list/details/:id" element={<ProductDetails />} />
          <Route path="product" element={<AddProduct />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
