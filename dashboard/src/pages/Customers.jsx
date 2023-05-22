import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";
import apiConfig from "../utils/apiConfig";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { BsEye } from "react-icons/bs";

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
    title: "Action",
    dataIndex: "action",
  },
];

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(null);

  const { base_url } = apiConfig;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Read the token from local storage

        if (!token) {
          // Handle the case when the token is not available
          // For example, redirect the user to the login page
          return;
        }

        const res = await axios.get(`${base_url}/users`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        console.log(res.data.users);
        setUsers(res.data.users);
      } catch (error) {
        console.log(error);
        setError(error.response.data.error)
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const data = users.map((user, i) => ({
        key: i + 1,
        name: user.name,
        email: user.email,
        role: user.isAdmin === true ? <span className="text-danger">Admin</span>  : <span className="green">User</span>,
        action: (
          <>
            <Link to="/" className=" fs-3 text-blue">
              <BiEdit />
            </Link>
            <Link className="ms-3 fs-3 text-danger" to="/">
              <AiFillDelete />
            </Link>
            <Link className="ms-3 fs-3 text-black" to="/">
              <BsEye />
            </Link>
          </>
        ),
      }));

      setUsersData(data);
    }
  }, [users]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h3 className="mb-4">Customers</h3>
      {error && <p>{error}</p>}
      <div>
        <Table columns={columns} dataSource={usersData} />
      </div>
    </div>
  );
};

export default Customers;
