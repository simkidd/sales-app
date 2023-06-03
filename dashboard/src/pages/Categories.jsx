import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { Button, Input, Modal, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import apiConfig from "../utils/apiConfig";
import CreateCategory from "../components/CreateCategory";
import { BsEye } from "react-icons/bs";
import UpdateCategory from "../components/UpdateCategory";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
    width: "60px",
  },
  {
    title: "Category",
    dataIndex: "category",
    ellipsis: true,
    sorter: (a, b) => a.category.localeCompare(b.category),
  },
  {
    title: "Product(s)",
    dataIndex: "products",
  },
  {
    title: "Date Created",
    dataIndex: "created",
    sorter: (a, b) => new Date(a.created) - new Date(b.created),
  },
  {
    title: "Action",
    dataIndex: "action",
    width: "120px",
  },
];

const Categories = () => {
  const { categories, setCategories } = useContext(ProductContext);
  const [categoriesData, setCategoriesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const { base_url } = apiConfig;

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${base_url}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(categories.filter((category) => category._id !== id));
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.response.data.error}`);
    }
  };

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this category?",
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
    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const data = filteredCategories.map((category, i) => ({
      // Rest of the data mapping...
      key: i + 1,
      category: category.name,
      products: category.products.length,
      created: new Date(category.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      action: (
        <>
          <Link to={`${category._id}`} className=" fs-3 text-blue">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger delete-btn"
            onClick={() => showDeleteConfirm(category._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    }));

    setCategoriesData(data);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (categories.length > 0) {
      const data = categories.map((category, i) => ({
        key: i + 1,
        category: category.name,
        products: category.products.length,
        created: new Date(category.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        action: (
          <div className="d-flex gap-3 align-items-center">
            <Link to={`${category._id}`} className=" fs-3 text-blue">
              <BsEye />
            </Link>
            <button
              className=" fs-3 text-danger delete-btn"
              onClick={() => showDeleteConfirm(category._id)}
            >
              <AiFillDelete />
            </button>
          </div>
        ),
      }));

      setCategoriesData(data);
    }
  }, [categories, searchQuery]);

  return (
    <div>
      <h3 className="mb-4 title">Categories</h3>
      <div className="mb-4 d-flex justify-content-between">
        <div>
          <Input
            placeholder="Search for a category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: 200, marginRight: 8 }}
            onPressEnter={handleKeyPress} // Add the onPressEnter event handler
          />
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
        <Button
          type="default"
          onClick={() => setOpen(true)}
        >
          Create Category
        </Button>

        <CreateCategory openForm={open} setOpen={setOpen} />
      </div>

      <div className="mb-2 text-black-50">
        {categoriesData.length} categories found
      </div>
      <div>
        <Table columns={columns} dataSource={categoriesData} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Categories;
