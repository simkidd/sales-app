import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { BsChevronLeft } from "react-icons/bs";
import Meta from "../components/Meta";
import apiConfig from "../utils/apiConfig";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  // const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


  const { base_url } = apiConfig;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${base_url}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user)
        setIsAdmin(response.data.user.isAdmin);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [id]);

  const toggleAdminStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${base_url}/users/${id}`,
        { isAdmin: !isAdmin },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsAdmin(response.data.user.isAdmin);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Meta title={user.firstName+" "+user.lastName} />
      <Button type="text" className="mb-2 p-0 pe-2">
        <Link
          to="/admin/users"
          className="text-decoration-none d-flex align-items-center"
        >
          <BsChevronLeft className="me-2" /> Go Back
        </Link>
      </Button>
      <div>
      <h2>User Details</h2>
        <p>
          Name: {user.firstName} {user.lastName}
        </p>
        <p>Email: {user.email}</p>
        <p>Admin: {user.isAdmin ? "Yes" : "No"}</p>
        <Button onClick={toggleAdminStatus}>
          {user.isAdmin ? "Remove Admin" : "Make Admin"}
        </Button>
      </div>
    </>
  );
};

export default UserDetails;
