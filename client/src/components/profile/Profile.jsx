import React, { useState, useEffect } from "react";
import "./profile.scss";
import axios from "axios";
import apiConfig from "../../utils/apiConfig";

const Profile = () => {
  const [user, setUser] = useState({});

  const { base_url } = apiConfig;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Handle the case when the token is not available
          // For example, redirect the user to the login page
          return;
        }

        const res = await axios.get(`${base_url}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        console.log(res);
        setUser(res.data.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="user__profile">
      <div className="profile__header">
        <h1>Account Profile</h1>
      </div>
      <div className="profile__content">
        <div>
          <article>
            <header>
              <h2>Account Details</h2>
            </header>
            <div>
              <p>{user.firstName + " " + user.lastName}</p>
              <p>{user.email}</p>
              <p>{user.gender}</p>
              <p>
                {new Date(user.dateOfBirth).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Profile;
