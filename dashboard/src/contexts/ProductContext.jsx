import React, { createContext, useState, useEffect } from "react";
import apiConfig from "../utils/apiConfig";
import axios from "axios";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const { base_url } = apiConfig;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token"); // Read the token from local storage

        if (!token) {
          // Handle the case when the token is not available
          // For example, redirect the user to the login page
          return;
        }
        const response = await axios.get(`${base_url}/products`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        console.log(response.data);
        setProducts(response.data.products);
      } catch (error) {
        setError(error.response.data.error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
