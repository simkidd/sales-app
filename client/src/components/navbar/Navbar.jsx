import React, { useContext } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { BsSearch, BsCart3, BsPerson } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineQuestionCircle } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import Marquee from "react-fast-marquee";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  // extract items count from cartContext
  const { cart, itemCount } = useContext(CartContext);

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
            <li>
              <Link className="link__item" to="/">
                <AiOutlineQuestionCircle size={20} />
                Help
                <FiChevronDown />
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li>
                  <Link className="link__item" to="/">
                    <AiOutlineHeart size={20} />
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link className="link__item" to="/account">
                    <BsPerson size={20} />
                    Account
                  </Link>
                </li>
              </>
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
                {cart.length > 0 ? (
                  <span className="badge">{cart.length}</span>
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
