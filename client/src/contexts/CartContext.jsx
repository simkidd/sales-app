import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // Load the cart data from local storage on component mount
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  //item amount state
  const [itemCount, setItemCount] = useState(0);
  //total price state
  const [total, setTotal] = useState(0);

  // Save the cart data to local storage on each cart change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.quantity;
    }, 0);
    setTotal(total);
  });

  //update the item amount
  useEffect(() => {
    if (cart) {
      const quantity = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.quantity;
      }, 0);
      setItemCount(quantity);
    }
  }, [cart]);

  const addToCart = (product, _id) => {
    const newItem = { ...product, quantity: 1 };
    //check if the item is already in the cart
    const cartItem = cart.find((item) => {
      return item._id === _id;
    });
    // if cart item is already in the cart
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item._id === _id) {
          return { ...item, quantity: cartItem.quantity + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (_id) => {
    const newCart = cart.filter((item) => {
      return item._id !== _id;
    });
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseQuantity = (_id) => {
    const cartItem = cart.find((item) => item._id === _id);
    addToCart(cartItem, _id);
  };

  const decreaseQuantity = (_id) => {
    const cartItem = cart.find((item) => {
      return item._id === _id;
    });
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item._id === _id) {
          return { ...item, quantity: cartItem.quantity - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem.quantity < 2) {
      removeFromCart(_id);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
