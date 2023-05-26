import React, { useEffect, useState } from "react";
import "./products.scss";
import apiConfig from "../../utils/apiConfig";
import axios from "axios";
import ProductCard from "../../components/product-card/ProductCard";
import { Link } from "react-router-dom";
import Meta from "../../components/Meta";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const { base_url } = apiConfig;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${base_url}/products`);
        console.log(response.data);
        setProducts(response.data.products);
      } catch (error) {
        setError(error.response.data.error);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

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
          </article>
        </div>
        <div className="product__items">
          <div></div>
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
