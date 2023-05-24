import React, { useEffect, useState } from "react";
import "./products.scss";
import apiConfig from "../../utils/apiConfig";
import axios from "axios";
import ProductCard from "../../components/product-card/ProductCard";

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
    <div className="products">
      <div className="product__side">
        <article>
          <h2 className="side__header">Browse category</h2>
          <div>
            <ul className="side__category">
              <li className="side__category__item">category 1</li>
              <li className="side__category__item">category 2</li>
              <li className="side__category__item">category 3</li>
              <li className="side__category__item">category 4</li>
              <li className="side__category__item">category 5</li>
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
  );
};

export default Products;
