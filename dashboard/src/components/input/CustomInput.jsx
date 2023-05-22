import React from "react";
import "./input.scss";

const CustomInput = ({ type, label, id, value, setValue, className }) => {
  return (
    <div class="form-floating mb-3">
      <input
        type={type}
        className={`form-control ${className}`}
        id={id}
        placeholder={label}
        onChange={(e)=> `${setValue}`(e.target.value)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default CustomInput;
