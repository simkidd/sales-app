import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import apiConfig from "../utils/apiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
    width: "60px",
  },
  {
    title: "Image",
    dataIndex: "image",
    width: "100px",
  },
  {
    title: "Name",
    dataIndex: "name",
    // sorter: (a, b) => a.title.length - b.title.length,
    width: "350px",
    ellipsis: true,
  },
  {
    title: "Price",
    dataIndex: "price",
    // sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Date Posted",
    dataIndex: "posted",
    // sorter: (a, b) => a.price - b.price,
  },
  {
    title: "In Stock",
    dataIndex: "inStock",
    width: "100px",
  },
  {
    title: "Action",
    dataIndex: "action",
    width: "120px",
  },
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);

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
        // console.log(response.data.products);
        setProducts(response.data.products);
      } catch (error) {
        console.log(error)
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${base_url}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter((product) => product._id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.response.data.error}`);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      const data = products.map((product, i) => ({
        key: i + 1,
        image: (
          <img src={product.image} alt="Product" style={{ width: "50px" }} />
        ),
        name: product.name,
        price: (
          <p>
            &#8358;
            {product.price}
          </p>
        ),
        inStock:
          product.isSold === true ? (
            <span className="text-danger">Sold</span>
          ) : (
            <span className="green">Available</span>
          ),
        posted: new Date(product.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        action: (
          <>
            <Link to={`details/${product._id}`} className=" fs-3 text-blue">
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger delete-btn"
              onClick={() => handleDelete(product._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      }));

      setProductsData(data);
    }
  }, [products]);

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={productsData} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductList;
