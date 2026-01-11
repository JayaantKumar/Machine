import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from local storage on startup (optional resilience)
  useEffect(() => {
    const savedCart = localStorage.getItem('vendCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('vendCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, scoops, totalPrice) => {
    const newItem = {
      ...product,
      scoops,
      price: totalPrice,
      cartId: Date.now() + Math.random(), // Unique ID for this specific cup
    };
    setCartItems((prev) => [...prev, newItem]);
  };

  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const cartCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};