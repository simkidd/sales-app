import React, { useState } from "react";
import axios from "axios";
import apiConfig from "../utils/apiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

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
          image,
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
      setImage("");

      toast.success("Product created successfully!");
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.response.data.error}`);
    }
  };

  return (
    <div>
      <h3>Add Product</h3>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image Url:
          </label>
          <input
            type="text"
            id="image"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
