import React, { useState } from "react";
import axios from "axios";
import apiConfig from "../../utils/apiConfig";
import "./register.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Input, Select, DatePicker } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";

const { Option } = Select;

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const { base_url } = apiConfig;

  const handleSubmit = async () => {
    try {
      await axios.post(`${base_url}/register`, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        dateOfBirth,
        gender,
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setDateOfBirth(null);
      setGender("");
      navigate("/account/login");
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.response.data.error}`);
    }
  };

  const validatePassword = (_, value) => {
    if (value && value.length < 6) {
      return Promise.reject(
        new Error("Password must be at least 6 characters long!")
      );
    }
    return Promise.resolve();
  };

  return (
    <div className="login_">
      <div className="login__container" style={{ width: "40%" }}>
        <h3>Create an account</h3>
        <p className="text-center">Register to continue</p>
        <ToastContainer />

        <Form
          name="register"
          onFinish={handleSubmit}
          className="login-form"
          scrollToFirstError
          style={{ maxWidth: "500px" }}
        >
          <div style={{ display: "flex", gap: "16px" }}>
            <Form.Item
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
              style={{ width: "50%" }}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
              style={{ width: "50%" }}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Item>
          </div>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not a valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              value={email}
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <div style={{ display: "flex", gap: "16px" }}>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  validator: validatePassword,
                },
              ]}
              style={{ width: "50%" }}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
              style={{ width: "50%" }}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <Form.Item
              name="dateOfBirth"
              rules={[
                {
                  required: true,
                  message: "Please select your date of birth!",
                },
              ]}
              style={{ width: "50%" }}
            >
              <DatePicker
                value={dateOfBirth}
                onChange={(date) => setDateOfBirth(date)}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name="gender"
              rules={[
                { required: true, message: "Please select your gender!" },
              ]}
              style={{ width: "50%" }}
            >
              <Select
                value={gender}
                onChange={(value) => setGender(value)}
                placeholder="Select gender"
              >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
          </Form.Item>
          Already registered, <Link to="/account/login">Login your account!</Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
