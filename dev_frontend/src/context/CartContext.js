import { createContext, useContext, useState } from "react";

// Create a context to store cart items
const CartContext = createContext();

// This is like a "box" that holds the cart and lets all pages use it
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add an item to the cart
  const addToCart = (item) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // If the item is already in the cart, update its quantity
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      // If it's a new item, add it with quantity 1
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Update the quantity of an item in the cart
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Don't allow quantity less than 1
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove an item from the cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// A helper to use the cart in other files
export const useCart = () => useContext(CartContext);