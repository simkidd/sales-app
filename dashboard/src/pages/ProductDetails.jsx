import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiConfig from "../utils/apiConfig";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const { base_url } = apiConfig;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${base_url}/products/${id }`);
        // setProduct(response.data.product);
        console.log(response)
      } catch (error) {
        setError(error.response.data.error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div>
      <h3>Product Details</h3>
      <p>Name: {product.name}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}</p>
      <p>In Stock: {product.isSold ? "Sold" : "Available"}</p>
      {/* Additional product details can be displayed here */}
    </div>
  );
};

export default ProductDetails;
