import React, { useState, useEffect } from "react";
import { Button, Input, Layout, Menu, Spin, theme } from "antd";
import "./main-layout.scss";
import { Outlet } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlinePicLeft,
  AiOutlinePicRight,
} from "react-icons/ai";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { FaClipboardList,FaBars } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from "react-icons/tb";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [user, setUser] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Read the token from local storage

        if (!token) {
          // Handle the case when the token is not available
          // For example, redirect the user to the login page
          navigate("/");
          return;
        }

        const user = JSON.parse(localStorage.getItem("user")); // Read the user data from local storage

        if (!user) {
          // Handle the case when the user data is not available
          // For example, redirect the user to the login page
          navigate("/");
          return;
        }

        // If the user data exists in local storage, set it in the state
        setUser(user);

        // Perform an additional check to ensure the user is an admin
        // You can customize this check based on your requirements
        if (!user.isAdmin) {
          toast.error("You must be an admin to log in.");
          navigate("/");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear token, redirect to login page)
    // You can customize this function according to your authentication system

    // For example, clearing token and redirecting to login page
    localStorage.removeItem("token");
    navigate("/");
  };

  if (isLoading) {
    return <Spin size="large" className="loading-big" />;
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-4 mb-0">Admin</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "users",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "products/new",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Add Product ",
                },
                {
                  key: "products",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Product List ",
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category ",
                },
                {
                  key: "category-list",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category List ",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders ",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="d-flex align-items-center justify-content-between ps-1 pe-5"
        >
          <Button
            className="trigger"
            type="text"
            icon={collapsed ? <TbLayoutSidebarRightCollapse /> : <TbLayoutSidebarLeftCollapse />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "24px",
              width: 64,
              height: 64,
            }}
          />
           
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center">
              <div style={{ background: "grey", width: 32, height: 32 }}>
                {/* <img src="" alt="img" /> */}
              </div>
              <div>
                <h5 className="text-dark">{user.firstName +" "+user.lastName}</h5>
                <p>{user.email}</p>
              </div>
            </div>

            <Button type="text" className="text-bg-danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
