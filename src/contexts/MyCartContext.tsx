import React, { createContext, useContext, useReducer, useState } from "react";
import { Product, ProductAction } from "./MyShopType";

const initialState = {
  items: [],
};

export interface CartContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
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
  const [items, setItems] = useState<Product[]>([]);

  const addItem = (product: Product) => {
    setItems((prev) => [...prev, product]);
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const emptyCart = () => setItems([]);

  const value = { items, addItem, removeItem, emptyCart };
  return (
    <MyCartContext.Provider value={value}>{children}</MyCartContext.Provider>
  );
};
