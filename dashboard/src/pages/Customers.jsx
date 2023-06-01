import React, { useEffect, useState, useContext } from "react";
import { Button, Input, Modal, Table } from "antd";
import axios from "axios";
import apiConfig from "../utils/apiConfig";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
  },
  {
    title: "Date joined",
    dataIndex: "dateJoined",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Customers = () => {
  const { users, setUsers } = useContext(UserContext);
  const [usersData, setUsersData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { base_url } = apiConfig;

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${base_url}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.response.data.error}`);
    }
  };

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this user?",
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
    const filteredUsers = users.filter((user) =>
    (user.firstName + " " + user.lastName).toLowerCase().includes(searchQuery.toLowerCase())
    );

    const data = filteredUsers.map((user, i) => ({
      // Rest of the data mapping...
      key: i + 1,
      name: user.firstName +" "+ user.lastName,
      email: user.email,
      role:
        user.isAdmin === true ? (
          <span className="text-warning">Admin</span>
        ) : (
          <span className="green">User</span>
        ),
      dateJoined: new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      action: (
        <>
          <Link to={`${user._id}`} className=" fs-3 text-blue">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger delete-btn"
            onClick={() => showDeleteConfirm(user._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    }));

    setUsersData(data);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (users.length > 0) {
      const data = users.map((user, i) => ({
        key: i + 1,
        name: user.firstName +" "+ user.lastName,
        email: user.email,
        role:
          user.isAdmin === true ? (
            <span className="text-warning">Admin</span>
          ) : (
            <span className="green">User</span>
          ),
        dateJoined: new Date(user.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        action: (
          <>
            <Link to={`${user._id}`} className=" fs-3 text-blue">
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger delete-btn"
              onClick={() => showDeleteConfirm(user._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      }));

      setUsersData(data);
    }
  }, [users, searchQuery]);

  return (
    <div>
      <h3 className="mb-4">Customers</h3>
      <div className="mb-4">
        <Input
          placeholder="Search for a customer..."
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
        {usersData.length} users found
      </div>
      <div>
        <Table columns={columns} dataSource={usersData} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Customers;
