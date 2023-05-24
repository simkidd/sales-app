import React, { useState } from "react";
import axios from "axios";
import apiConfig from "../../utils/apiConfig";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { base_url } = apiConfig;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${base_url}/register`, {
        name,
        email,
        password,
      });
      setSuccess(true);
      setName("")
      setEmail("");
      setPassword("");
      setError(null);
    } catch (error) {
      setError(error.response.data.error);
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Create an account</h2>
      {error && <p>Error: {error}</p>}
      {success && <p>Registration successful!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
