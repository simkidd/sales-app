import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiConfig from "../utils/apiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isSold, setIsSold] = useState(false);

  const { base_url } = apiConfig;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`${base_url}/products/${id}`);
        setProduct(response.data.product);
        // console.log(response.data.product);
        setName(response.data.product.name);
        setDescription(response.data.product.description);
        setPrice(response.data.product.price);
        setImage(response.data.product.image);
        setIsSold(response.data.product.isSold);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Read the token from local storage

      if (!token) {
        // Handle the case when the token is not available
        // For example, redirect the user to the login page
        return;
      }

      const response = await axios.put(
        `${base_url}/products/${id}`,
        {
          name,
          description,
          price,
          image,
          isSold,
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
      setIsSold(true);

      toast.success("Product Updated!"); // Display success toast notification
      setProduct({ ...product, name, description, price, image, isSold });
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.response.data.error}`); // Display error toast notification
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="d-flex bg-white p-4">
      <div className="ps-4 pe-4" style={{ maxWidth: "50%", width: "100%" }}>
        <h3 className="mb-4">Product Details</h3>
        <img src={product.image} alt="img" className="w-50" />
        <p className="fw-bold">{product.name}</p>
        
        <p className="fw-bold">
          Price: <br /> <span className="">&#8358; {product.price}</span>{" "}
        </p>
        <p className="fw-bold">
          In Stock:{" "}
          {product.isSold === true ? (
            <span className="text-danger">Sold</span>
          ) : (
            <span className="green">Available</span>
          )}
        </p>
        <p className="fw-bold">
          Description: <br />{" "}
          <span className="fw-normal">{product.description}</span>{" "}
        </p>
        {/* Additional product details can be displayed here */}
      </div>

      <div
        className="ps-4 pe-4 d-flex flex-column"
        style={{ maxWidth: "50%", width: "100%" }}
      >
        <h3 className="mb-4">Edit Product</h3>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
            <div className="form-check">
              <input
                type="checkbox"
                id="sold"
                className="form-check-input"
                defaultChecked={isSold}
                onChange={(e) => setIsSold(e.target.checked)}
              />
              <label htmlFor="sold" className="form-check-label">
                Sold
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-success">
            Update
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
