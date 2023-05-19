import React, { useState } from "react";
import axios from "axios";

const AdminRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/register", {
        username,
        password,
      });
      setSuccess(true);
      setUsername("");
      setPassword("");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Admin Registration</h2>
      {error && <p>Error: {error}</p>}
      {success && <p>Registration successful!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

export default AdminRegister;
