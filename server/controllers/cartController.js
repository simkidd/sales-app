import CartItem from "../models/cartModel";
import User from "../models/userModel";

// Get cart items
export const getCartItems = async (req, res) => {
  try {
    const userId = req.user._id;

    // Retrieve the cart items from the database based on the user ID
    const cartItems = await CartItem.find({ user: userId }).populate("product");
    res.json(cartItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Add a product to the cart
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    // Check if the product is already in the user's cart
    const existingCartItem = await CartItem.findOne({
      user: userId,
      product: productId,
    });

    if (existingCartItem) {
      // If the product already exists in the cart, increase the quantity
      existingCartItem.quantity += 1;
      await existingCartItem.save();
    } else {
      // If the product is not in the cart, create a new cart item
      const newCartItem = new CartItem({
        user: userId,
        product: productId,
        quantity: 1,
      });
      await newCartItem.save();
    }

    // Retrieve the updated cart items and send the response
    const updatedCartItems = await CartItem.find({ user: userId }).populate("product");
    const user = await User.findByIdAndUpdate(userId, { cart: updatedCartItems }, { new: true }).select("-password");

    // Map the cart items to include the product price
    const cartItemsWithPrice = updatedCartItems.map((item) => ({
      ...item._doc,
      price: item.product.price
    }));

res.json(cartItemsWithPrice);
    // res.json(updatedCartItems)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Increase the quantity of a cart item
export const increaseQuantity = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    // Find the cart item by its ID
    const cartItem = await CartItem.findById(cartItemId);

    // Increase the quantity by 1
    cartItem.quantity += 1;

    // Save the updated cart item
    await cartItem.save();

    // Send the updated cart items back to the client
    const cartItems = await CartItem.find({ user: req.user._id }).populate(
      "product"
    );
    res.json(cartItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Decrease the quantity of a cart item
export const decreaseQuantity = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    // Find the cart item by its ID
    const cartItem = await CartItem.findById(cartItemId);

    // Decrease the quantity by 1 if it's greater than 1
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
    }

    // Send the updated cart items back to the client
    const cartItems = await CartItem.find({ user: req.user._id }).populate(
      "product"
    );
    res.json(cartItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Remove a cart item
export const removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    // Find the cart item by its ID and remove it
    await CartItem.findByIdAndRemove(cartItemId);

    // Send the updated cart items back to the client
    const cartItems = await CartItem.find({ user: req.user._id }).populate(
      "product"
    );
    res.json(cartItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Clear the cart
export const clearCart = async (req, res) => {
  try {
    // Remove all cart items for the user
    await CartItem.deleteMany({ user: req.user._id });

    // Send an empty array as the response
    res.json([]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};