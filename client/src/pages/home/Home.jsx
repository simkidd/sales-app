import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";

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
        <div className="slides">center slides</div>
        <div className="side__right">
          <div>right top</div>
          <div>right bottom</div>
        </div>
      </section>
    </div>
  );
};

export default Home;
