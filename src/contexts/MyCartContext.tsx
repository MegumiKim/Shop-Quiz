import React, { createContext, useContext, useReducer, useState } from "react";
import { Product, ProductAction } from "./MyShopType";
import { useShop } from "./MyShopContext";

const initialState = {
  items: [],
};

export interface CartContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (product: Product) => void;
  emptyCart: () => void;
  // dispatch: React.Dispatch<ProductAction>;
}

export const MyCartContext = createContext<CartContextType | null>(null);

//custom hook for a safety guard
export function useCart() {
  const ctx = useContext(MyCartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside MyCartContextProvider");
  }
  return ctx;
}

export const MyCartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
const {setShopItems} = useShop();

  const addItem = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const removeItem = (product:Product) => {
    setCartItems((prev) => prev.filter((i) => i.id !== product.id));
    setShopItems((prev) => [...prev, product])

  };

  const emptyCart = () => setCartItems([]);

  const value = { items: cartItems, addItem, removeItem, emptyCart };
  return (
    <MyCartContext.Provider value={value}>{children}</MyCartContext.Provider>
  );
};
