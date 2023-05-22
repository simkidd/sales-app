import React, { useState } from "react";
import axios from "axios";
import apiConfig from "../utils/apiConfig";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); 

  const { base_url } = apiConfig;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Read the token from local storage

      if (!token) {
        // Handle the case when the token is not available
        // For example, redirect the user to the login page
        return;
      }

      const response = await axios.post(
        `${base_url}/products`,
        {
          name,
          description,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      console.log(response.data); // Handle the response from the server

      // Reset the form fields
      setName("");
      setDescription("");
      setPrice("");
      setSuccess(true); // Set success state to true

      // Clear the success message after a certain time if needed
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.error(error);
      setError(error.response.data.error);
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h3>Add Product</h3>
      {success && <p>Product created successfully!</p>}
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
