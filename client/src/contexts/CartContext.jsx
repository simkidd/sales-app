import { createContext, useEffect, useState } from "react";
import apiConfig from "../utils/apiConfig";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { base_url } = apiConfig;

  const [cartItems, setCartItems] = useState([]);
  // Item count state
  const [itemCount, setItemCount] = useState(0);
  // Total price state
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate total and item count
  useEffect(() => {
    const calculateTotalAndItemCount = () => {
      let total = 0;
      let count = 0;
      cartItems.forEach((item) => {
        total += item.product.price * item.quantity;
        count += item.quantity;
      });
      console.log(cartItems)
      setTotal(total);
      setItemCount(count);
    };

    calculateTotalAndItemCount();
  }, [cartItems]);

  // Fetch the cart items on component mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Fetch the cart items from the server
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${base_url}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      setCartItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Add item to cart
  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token"); // Read the token from local storage

      const res = await axios.post(
        `${base_url}/cart/add/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      setCartItems(res.data);
      toast.success("Item added to cart!");
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (cartItemId) => {
    try {
      const token = localStorage.getItem("token"); // Read the token from local storage

      const res = await axios.delete(
        `${base_url}/cart/remove/${cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      
      setCartItems(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token"); // Read the token from local storage

      const res = await axios.delete(`${base_url}/cart/clear`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      
      setCartItems(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Increase item quantity in cart
  const increaseQuantity = async (cartItemId) => {
    try {
      const token = localStorage.getItem("token"); // Read the token from local storage

      const res = await axios.put(
        `${base_url}/cart/increase/${cartItemId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      setCartItems(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Decrease item quantity in cart
  const decreaseQuantity = async (cartItemId) => {
    try {
      const token = localStorage.getItem("token"); // Read the token from local storage

      const res = await axios.put(
        `${base_url}/cart/decrease/${cartItemId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      setCartItems(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
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
      <ToastContainer />
    </CartContext.Provider>
  );
};

export default CartProvider;
