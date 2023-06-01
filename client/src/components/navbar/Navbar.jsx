import React, { useContext, useEffect, useState, useRef } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch, BsCart3, BsPerson, BsPersonCheck } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineQuestionCircle } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import Marquee from "react-fast-marquee";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import { Spin } from "antd";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  // extract items count from cartContext
  const { cartItems, itemCount } = useContext(CartContext);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const helpDropdownRef = useRef(null);
  const accountDropdownRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    // Perform logout logic
    logout();
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prevDropdown) => {
      if (prevDropdown === dropdownName) {
        return null; // Close the dropdown if it's already open
      } else {
        return dropdownName; // Open the specified dropdown
      }
    });
  };

  const handleClickOutside = (event) => {
    if (
      helpDropdownRef.current &&
      !helpDropdownRef.current.contains(event.target) &&
      accountDropdownRef.current &&
      !accountDropdownRef.current.contains(event.target)
    ) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  

  return (
    <>
      <div className="header">
        <Marquee>
          <div className="ad">
            <h2>Online store coming soon...</h2>
            <h2>Online store coming soon...</h2>
            <h2>Online store coming soon...</h2>
            <h2>Online store coming soon...</h2>
            <h2>Online store coming soon...</h2>
          </div>
        </Marquee>
      </div>

      <div className="navbar">
        <div className="navbar__container">
          <div className="navbar__left">
            <div className="logo__container">
              <Link to="/">
                <img src="" alt="logo" />
              </Link>
            </div>
            <ul className="nav__links">
              <li>
                <Link className="link__item" to="/products">
                  Store
                </Link>
              </li>
            </ul>

            <form className="navbar__search">
              <div className="find">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="search__input"
                />
                <button className="search__button">
                  <BsSearch size={16} />
                </button>
              </div>
            </form>
          </div>

          <ul className="navbar__right">
            <li
              className={`link__item dropdown ${
                activeDropdown === "help" ? "open active__dropdown" : ""
              }`}
              onClick={() => toggleDropdown("help")}
              ref={helpDropdownRef}
            >
              <AiOutlineQuestionCircle size={20} />
              Help
              <FiChevronDown />
              {activeDropdown === "help" && activeDropdown !== null && (
                <div className="dropdown__menu">
                  <div className="dropdown__item">
                    <Link className="link__item" to="/faqs">
                      FAQs
                    </Link>
                  </div>
                  <div className="dropdown__item">
                    <Link className="link__item" to="/contact">
                      Contact Us
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {token ? (
              <li
                className={`link__item dropdown ${
                  activeDropdown === "account" ? "open active__dropdown" : ""
                }`}
                onClick={() => toggleDropdown("account")}
                ref={accountDropdownRef}
              >
                <BsPersonCheck size={20} />
                Hi, {user.firstName}
                <FiChevronDown />
                {activeDropdown === "account" && activeDropdown !== null && (
                  <div className="dropdown__menu">
                    <div className="dropdown__item">
                      <Link className="link__item" to="account/profile">
                        <BsPerson size={20} />
                        Profile
                      </Link>
                    </div>
                    <div className="dropdown__item">
                      <Link className="link__item" to="/">
                        <AiOutlineHeart size={20} />
                        Saved Items
                      </Link>
                    </div>
                    <hr />
                    <div className="dropdown__item">
                      <button className="logout__btn" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li>
                <Link className="link__item" to="account/login">
                  Login / Signup
                </Link>
              </li>
            )}
            <li>
              <Link className="link__item cart__btn" to="/cart">
                <BsCart3 size={20} />
                Cart
                {cartItems.length > 0 ? (
                  <span className="badge">{cartItems.length}</span>
                ) : (
                  <span className="badge">0</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
