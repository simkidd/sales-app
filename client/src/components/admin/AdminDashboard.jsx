import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemListing from "../itemLIsting/ItemListing";
import ItemForm from "../itemForm/ItemForm";

const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={toggleForm}>{showForm ? "Hide Form" : "Show Form"}</button>
      {showForm && <ItemForm />}
      <ItemListing />
      {/* Dashboard content */}
      {/* ... */}
    </div>
  );
};

export default AdminDashboard;