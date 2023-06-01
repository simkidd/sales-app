import React, { useContext } from "react";
import "./cart.scss";
import Meta from "../../components/Meta";
import { CartContext } from "../../contexts/CartContext";
import CartItem from "../../components/cart-item/CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  //extract these functions from the CartContext
  const { total, clearCart, cartItems } = useContext(CartContext);

  return (
    <>
      <Meta title={"Cart"} />
      <div className="cart__container">
        {/* {cart.length === 0 ? ( */}
        {cartItems.length === 0 ? (
          <div className="empty">
            <img src="" alt="cartImg" />
            <h2>Your cart is empty!</h2>
            <p>Browse our store</p>
            <Link className="go__store" to="/products">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="filled">
            <div className="cart__left">
              <article className="arti">
                <div className="cart__header">
                  {/* <h2>Cart ({cart.length})</h2> */}
                  <h2>Cart ({cartItems.length})</h2>
                  <button className="clear__btn" onClick={clearCart}>
                    Clear
                  </button>
                </div>
                <div className="cart__items">
                  {/* {cart.map((item) => ( */}
                  {cartItems.map((item) => (
                    <CartItem key={item._id} item={item} />
                  ))}
                </div>
              </article>
            </div>

            <div className="cart__right">
              <div className="sticky__right">
                <div className="cart__sum">
                  <h1>Cart summary</h1>
                  <div className="subtotal">
                    <p>Subtotal </p>
                    <p>&#8358; {parseFloat(total).toFixed(0)}</p>
                  </div>
                  <div className="checkout">
                    <Link className="checkout__to">
                      Checkout (
                      <span>&#8358; {parseFloat(total).toFixed(0)}</span>)
                    </Link>
                  </div>
                </div>
                <div className="cart__sum__bottom">
                  <h2>Something here</h2>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Dolores, similique. <button>See more</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="row">
        <div className="row__container">
          <div className="section">
            <div className="section__header">
              <div>
                <h2 className="h__h2">Recently Viewed</h2>
                <Link>See all</Link>
              </div>
            </div>
            <div className="section__content">
              <div className="slides">slide cards</div>
            </div>
          </div>
        </div>
        <div className="row__container">
          <div className="section">
            <div className="section__header">
              <div>
                <h2>Heading</h2>
              </div>
            </div>
            <div className="section__content">
              <div className="slides">slide cards</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
