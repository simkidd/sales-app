import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import "./cart-item.scss";

const CartItem = ({ item }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);
  const { _id, image, name, price, quantity } = item;

  return (
    <div className="cart__item">
      <Link className="item__link" to={`/product/${_id}`}>
        <div className="item__img">
          <img src={image} alt="" />
        </div>
        <div className="item__name">
          <h3>{name}</h3>
        </div>
        <div className="item__price">
          <p>&#8358; {price}</p>
        </div>
      </Link>
      <div>&#8358; {parseFloat(price * quantity).toFixed(0)}</div>
      <div className="cart__item__footer">
        <div className="qty__plus">
          <button className="cart__idbtn" onClick={() => decreaseQuantity(_id)} disabled={quantity < 2}>
            -
          </button>
          <div className="cart__qty">{quantity}</div>
          <button className="cart__idbtn" onClick={() => increaseQuantity(_id)}>+</button>
        </div>
        <button className="item__remv" onClick={() => removeFromCart(_id)}>remove</button>
      </div>
    </div>
  );
};

export default CartItem;
