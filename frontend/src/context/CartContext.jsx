import React, { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.find(item => item._id === action.payload._id);
      if (existingItem) {
        return state.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        return [...state, action.payload];
      }
    case "REMOVE_FROM_CART":
      return state.filter(item => item._id !== action.payload);
    case "UPDATE_QUANTITY":
      return state.map(item =>
        item._id === action.payload._id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
