import React, { useContext } from "react";
import "./products.scss";
import ProductCard from "../../components/product-card/ProductCard";
import { Link } from "react-router-dom";
import Meta from "../../components/Meta";
import { ProductContext } from "../../contexts/ProductContext";
import {TbListDetails} from 'react-icons/tb'
import {HiViewGrid} from 'react-icons/hi';

const Products = () => {
  const { products } = useContext(ProductContext);

  return (
    <>
      <Meta title={"Our Store"} />
      {/* breadcrumb */}
      <div className="breadcrumb">
        <Link className="breadcrumb__link" to="/">
          Home
        </Link>
        <Link className="breadcrumb__link" to="/products">
          Store
        </Link>
      </div>
      {/* breadcrumb end */}
      <div className="products">
        <div className="product__side">
          <article>
            <h2 className="side__header">Browse category</h2>
            <div className="side__category">
              <ul>
                <li>
                  <Link className="side__category__item">category 1</Link>
                </li>
                <li>
                  <Link className="side__category__item">category 1</Link>
                </li>
                <li>
                  <Link className="side__category__item">category 1</Link>
                </li>
                <li>
                  <Link className="side__category__item">category 1</Link>
                </li>
                <li>
                  <Link className="side__category__item">category 1</Link>
                </li>
              </ul>
            </div>
          </article>
          <article>
            <h2 className="side__header">Price</h2>
            price range
          </article>
        </div>
        <div className="product__items">
          <div className="product__list__header">
            <div className="list__top__header">
              <h1>Shop Online</h1>
              <div className="list__sort">Sort by: <span>Popularity</span></div>
            </div>
            <div className="list__bottom__header">
              <p>{products.length} products found</p>
              <div className="list__views">
                {" "}
                <TbListDetails size={22} /> <HiViewGrid size={22} />
              </div>
            </div>
          </div>
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            <div className="product__list">
              {products.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
