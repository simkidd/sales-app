import React from "react";
import { Link } from "react-router-dom";
import "./breadcrumb.scss";

const Breadcrumb = () => {
  return (
    <div className="breadcrumb">
      <Link className="breadcrumb__link" to="/">
        Home
      </Link>
    </div>
  );
};

export default Breadcrumb;
