import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import apiConfig from "../../utils/apiConfig";
import "./product-details.scss";
import Meta from "../../components/Meta";
import { MdAddShoppingCart, MdBookmarkBorder } from "react-icons/md";
import Rating from "@mui/material/Rating";
import { CartContext } from "../../contexts/CartContext";

const ProductDetails = () => {
  const [product, setProduct] = useState("");
  const { _id } = useParams();
  //extract these functions from the CartContext
  const { addToCart } = useContext(CartContext);

  const { base_url } = apiConfig;

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get(`${base_url}/products/${_id}`);

        console.log(res.data.product);
        setProduct(res.data.product);
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, [_id]);

  const Img = product.image
    ? product.image
    : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

  return (
    <>
      <Meta title={product.name} />
      {/* breadcrumb */}
      <div className="breadcrumb">
        <Link className="breadcrumb__link" to="/">
          Home
        </Link>
        <Link className="breadcrumb__link" to="/products">
          Store
        </Link>
        <Link className="breadcrumb__link">{product.name}</Link>
      </div>
      {/* breadcrumb end */}
      <div className="prod__details">
        <div className="prod__details__left">
          <section className="left__top">
            <div className="details__image">
              <div className="image__wrap">
                <img src={Img} alt="" />
              </div>
            </div>
            <div className="details__info">
              <div className="info__container">
                <h1 className="pd__name">{product.name}</h1>
                <div className="price__rate">
                  <div className="pd__rating">
                    <Rating
                      name="size-small"
                      defaultValue={0}
                      size="small"
                      readOnly
                    />
                  </div>
                  <div className="pd__pr">
                    <span className="pd__price">
                      &#8358;{" "}
                      {
                        product.price
                        //.toLocaleString(navigator.language,{minimumFractionDigits: 0})
                        // .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    </span>
                  </div>
                </div>
                <div className="quantity">
                  <label>Quantity:</label>
                  <div>
                    <div className="qty__btns">
                      <button className="qty__btn">-</button>
                      <div className="qty">13</div>
                      <button className="qty__btn">+</button>
                    </div>
                  </div>
                </div>
                <div className="add__button">
                  <div className="btn__form">
                    <button
                      className={`add__cart ${product.isSold ? "hidden" : ""}`}
                      disabled={product.isSold}
                      onClick={() => addToCart(product, product._id)}
                    >
                      <MdAddShoppingCart size={20} />
                      <span>Add to cart</span>
                    </button>
                  </div>

                  <div className="wishlist">
                    <button className="add__wish">
                      <MdBookmarkBorder size={24} />
                    </button>
                    <span>Save for later</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="left__bottom">
            <h3>Description</h3>
            <p>{product.description}</p>
          </section>
        </div>
        <div className="prod__details__right">right</div>
      </div>
    </>
  );
};

export default ProductDetails;
