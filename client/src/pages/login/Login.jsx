import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const { login, email, setEmail, password, setPassword, error } =
    useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login()
  };

  return (
    <div>
      <h2>Login your account</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className="">
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
  );
};

export default Login;
