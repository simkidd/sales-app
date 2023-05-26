import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";
import Banner from "../../components/banner/Banner";
import RightTop from "../../assets/images/catbanner-01.jpg";
import RightBottom from "../../assets/images/catbanner-04.jpg";

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="side__left">
          <div className="left__inner">
            <ul>
              <li>
                <Link>link</Link>
              </li>
              <li>
                <Link>link</Link>
              </li>
              <li>
                <Link>link</Link>
              </li>
              <li>
                <Link>link</Link>
              </li>
              <li>
                <Link>link</Link>
              </li>
              <li>
                <Link>link</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="slides">
          <Banner />
        </div>
        <div className="side__right">
          <div>
            <img src={RightTop} alt="" />
          </div>
          <div>
            <img src={RightBottom} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
