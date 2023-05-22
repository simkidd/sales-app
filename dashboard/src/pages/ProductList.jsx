import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { AiFillDelete } from "react-icons/ai";
import {  BiEdit } from "react-icons/bi";
import {  BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import apiConfig from "../utils/apiConfig";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Image",
    dataIndex: "image",
  },
  {
    title: "Name",
    dataIndex: "name",
    // sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    // sorter: (a, b) => a.price - b.price,
  },
  {
    title: "In Stock",
    dataIndex: "inStock",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [productsData, setProductsData] = useState([]);

  const {base_url} = apiConfig

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${base_url}/products`);
        // console.log(response.data.products);
        setProducts(response.data.products);
      } catch (error) {
        setError(error.response.data.error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const data = products.map((product, i) => ({
        key: i + 1,
        name: product.name,
        price: product.price,
        inStock: product.isSold === true ? <span className="text-danger">Sold</span>  : <span className="green">Available</span>,
        action: (
          <>
            <Link to={`details/${product._id}`} className=" fs-3 text-blue">
              <BiEdit />
            </Link>
            <button className="ms-3 fs-3 text-danger delete-btn" >
              <AiFillDelete />
            </button>
            <Link className="ms-3 fs-3 text-black" to={`details/${product._id}`}>
              <BsEye />
            </Link>
          </>
        ),
      }));

      setProductsData(data);
    }
  }, [products]);


  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      {error && <p>{error}</p>}
      <div>
        <Table columns={columns} dataSource={productsData} />
      </div>
    </div>
  );
};

export default ProductList;
