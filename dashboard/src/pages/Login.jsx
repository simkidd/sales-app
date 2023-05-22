import React, { useState } from "react";
import CustomInput from "../components/input/CustomInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiConfig from "../utils/apiConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {base_url} = apiConfig

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${base_url}/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/admin");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight:"100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center text">Login</h3>
        <p className="text-center">Login to your account to continue</p>
        {error && <p>{error}</p>}
        {/* <form onSubmit={handleSubmit}>
          <CustomInput type="email" label="Email Address" value={email} id="email" setValue={setEmail} />
          
          <CustomInput type="password" label="Password" value={password} id="password" setValue={setPassword} />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Login
          </button>
        </form> */}

        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      </div>
    </div>
  );
};

export default Login;
