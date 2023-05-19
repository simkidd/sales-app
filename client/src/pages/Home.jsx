import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <Link to="/login">Admin Login</Link>
      {/* Other content */}
    </div>
  );
};

export default Home;
