import React, { useContext } from "react";
import "./product-card.scss";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

const ProductCard = ({ product }) => {
  const {addToCart} = useContext(CartContext);

  const Img = product.image
    ? product.image
    : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

  const Sold = product.isSold && "Sold";

  return (
    <div className="product__card">
      <Link to={`/product/${product._id}`}>
        <div className="card__img">
          <img
            className={`${product.isSold ? "disabled" : ""}`}
            src={Img}
            alt=""
          />
          <div className={product.isSold ? "sold" : ""}>{Sold}</div>
        </div>
        <div className={`card__info ${product.isSold ? "disabled" : ""}`}>
          <h3 className="card__name">{product.name}</h3>
          <p className="card__price">
            &#8358;{" "}
            {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        </div>
      </Link>
      <div className="card__footer">
        <div className="card__btn">
          <button
            className={`add__cart ${product.isSold ? "hidden" : ""}`}
            disabled={product.isSold}
            onClick={()=> addToCart(product._id)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
