import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import apiConfig from "../utils/apiConfig";
import { ToastContainer, toast } from "react-toastify";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { base_url } = apiConfig;

  const onFinish = async (values) => {
    try {
      const response = await axios.post(`${base_url}/login`, {
        email: values.email,
        password: values.password,
      });

      const user = response.data.data;

      if (!user.isAdmin) {
        toast.error("You must be an admin to log in.");
        return;
      }

      localStorage.setItem("token", response.data.token);
      console.log(response.data.data);
      localStorage.setItem("user", JSON.stringify(user)); // Store the user data in local storage

      navigate("/admin");
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.response.data.error}`);
    }
  };

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center text">Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <ToastContainer />

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link className="login-form-forgot" to="">
              Forgot password
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <Link to="">register now!</Link>
          </Form.Item>
        </Form>

        {/* <form onSubmit={handleSubmit}>
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
      </form> */}
      </div>
    </div>
  );
};

export default Login;
