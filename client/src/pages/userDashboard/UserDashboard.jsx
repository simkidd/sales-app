import React, { useContext, useState } from "react";
import "./user-dashboard.scss";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { MdBookmarkBorder } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { AuthContext } from "../../contexts/AuthContext";

const UserDashboard = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="user__dashboard">
      <div className="dash__left">
        <nav className="s__menu">
          <NavLink to="profile" activeClassname="active">
            <BsPerson size={20} /> Overview
          </NavLink>
          <NavLink to="wishlist" activeClassname="active">
            <MdBookmarkBorder size={20} /> Saved Items
          </NavLink>
          <NavLink to="profile" activeClassname="active">
            <BsPerson size={20} /> Profile Details
          </NavLink>
          <NavLink to="wishlist" activeClassname="active">
            <MdBookmarkBorder size={20} /> Change Password
          </NavLink>
          <NavLink to="wishlist" activeClassname="active">
            <MdBookmarkBorder size={20} /> Delete Account
          </NavLink>
          <button className="logout__btn" onClick={() => logout()}>
            Logout
          </button>
        </nav>
      </div>
      <div className="dash__right">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
