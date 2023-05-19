import React from "react";
import { useParams } from "react-router-dom";

const AdminProfile = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Profile</h2>
      <p>ID: {id}</p>
    </div>
  );
};

export default AdminProfile;
