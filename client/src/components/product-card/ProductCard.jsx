import React from "react";
import "./product-card.scss";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const Img = product.image
    ? product.image
    : "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/74/8768022/1.jpg?5729";

  const Sold = product.isSold && "Sold";

  return (
    <div className="product__card">
      <Link>
        <div className="card__img">
          <img
            className={`${product.isSold ? "disabled" : ""}`}
            src={Img}
            alt=""
          />
          <div className={product.isSold ? "sold" : ""}>{Sold}</div>
        </div>
        <div className="card__info">
          <h3 className="card__name">{product.name}</h3>
          <p className="card__price">
            &#8358;{" "}
            {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        </div>
      </Link>
      <div className="card__footer">
        <form action="">
          <button className="add__cart">Add to cart</button>
        </form>
      </div>
    </div>
  );
};

export default ProductCard;
