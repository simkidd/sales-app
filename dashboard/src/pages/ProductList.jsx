import React, { useEffect, useState, useContext } from "react";
import { Table, Modal, Input, Button } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import apiConfig from "../utils/apiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductContext } from "../contexts/ProductContext";

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
    width: "350px",
    ellipsis: true,
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Date Posted",
    dataIndex: "posted",
    sorter: (a, b) => new Date(a.posted) - new Date(b.posted),
  },
  {
    title: "In Stock",
    dataIndex: "inStock",
    width: "100px",
    sorter: (a, b) => {
      if (a.inStock.props.children === "Sold") return -1;
      if (b.inStock.props.children === "Sold") return 1;
      return 0;
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    width: "120px",
  },
];

const ProductList = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [productsData, setProductsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { base_url } = apiConfig;

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

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this product?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        handleDelete(id);
      },
    });
  };

  const handleSearch = () => {
    // Perform search logic here based on the searchQuery
    // You can customize this function according to your requirements

    // For example, filter the products based on the searchQuery
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const data = filteredProducts.map((product, i) => ({
      // Rest of the data mapping...
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
          <Link to={`${product._id}`} className=" fs-3 text-blue">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger delete-btn"
            onClick={() => showDeleteConfirm(product._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    }));

    setProductsData(data);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (products.length > 0 && searchQuery === "") {
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
            <Link to={`${product._id}`} className=" fs-3 text-blue">
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger delete-btn"
              onClick={() => showDeleteConfirm(product._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      }));

      setProductsData(data);
    }
  }, [products, searchQuery]);

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div className="mb-4">
        <Input
          placeholder="Search for a product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: 200, marginRight: 8 }}
          onPressEnter={handleKeyPress} // Add the onPressEnter event handler
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <div className="mb-2 text-black-50">
        {productsData.length} products found
      </div>
      <div>
        <Table columns={columns} dataSource={productsData} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductList;
