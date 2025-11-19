import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { Product } from "./MyShopType";
import { shopItems } from "../shopItems";

const number_of_items = 9;

export interface ShopContextType {
  items: Product[];
  // addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  refill: (id: number) => void;
  reset: () => void;
}

export const MyShopContext = createContext<ShopContextType | null>(null);

//custom hook for a safety guard
export function useShop() {
  const ctx = useContext(MyShopContext);
  if (!ctx) {
    throw new Error("useCart must be used inside MyCartContextProvider");
  }
  return ctx;
}
export const MyShopContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [items, setItems] = useState<Product[]>(shopItems);
  const remainsRef = useRef<Product[]>([]);

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const refill = (id: number) => {
    setItems((prevItems) => {
      //find the index of clicked item
      const index = prevItems.findIndex((i) => i.id === id);
      if (index === -1) return prevItems; //item not found

      const next = remainsRef.current.shift();
      if (!next) return prevItems.filter((i) => i.id !== id); //no more remains

      //Create the new array with replacement
      const newItems = [...prevItems];
      newItems[index] = next;

      return newItems;
    });
  };

  const reset = () => {
    const shuffled = [...shopItems].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 9);
    const remains = shuffled.slice(9);

    setItems(selected);
    remainsRef.current = remains;
  };

  useEffect(() => {
    const shuffled = [...shopItems].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 9);
    const remains = shuffled.slice(9);

    setItems(selected);
    remainsRef.current = remains;
  }, []);

  const value = { items, refill, removeItem, reset };
  return (
    <MyShopContext.Provider value={value}>{children}</MyShopContext.Provider>
  );
};

export default MyShopContext;
