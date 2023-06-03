import React, { createContext, useState, useEffect } from "react";
import apiConfig from "../utils/apiConfig";
import axios from "axios";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const { base_url } = apiConfig;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token"); // Read the token from local storage

        const response = await axios.get(`${base_url}/products`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        setProducts(response.data.products);
        console.log(response.data.products);
      } catch (error) {
        setError(error.response.data.error);
      }
    };

    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token"); // Read the token from local storage

        const response = await axios.get(`${base_url}/categories`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        setCategories(response.data.categories);
      } catch (error) {
        setError(error.response.data.error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, setProducts, categories, setCategories }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
