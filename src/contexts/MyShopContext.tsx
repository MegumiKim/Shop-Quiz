import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { Product } from "./MyShopType";
import { inventories } from "../inventories";



export interface ShopContextType {
  items: Product[];
setShopItems: React.Dispatch<React.SetStateAction<Product[]>>;
  // addItem: (product: Product) => void;
  returnItem: (product: Product) => void;
  // removeItem: (id: number) => void;
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


const DISPLAY_COUNT = 9;

export const MyShopContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [shopItems, setShopItems] = useState<Product[]>(inventories);
  const remainsRef = useRef<Product[]>([]);

//Initializes the shop: picks 9 random items + stores rest

const initializeTheShop = () => {
    const shuffled = [...inventories].sort(() => Math.random() - 0.5);
    const displayed = shuffled.slice(0, DISPLAY_COUNT);
    const remains = shuffled.slice(DISPLAY_COUNT);

    setShopItems(displayed);
    remainsRef.current = remains;
}

  useEffect(() => {
    initializeTheShop();
  }, []);


  // Returned items go to the END of the remains queue. Will appear later when refill() is used
const returnItem = (product:Product) =>{

  
  setShopItems((prev)=>{
      // if (prev.length === 0) return prev;

      if (prev.length < 9) return [...prev, product];

          // Put the item that was replaced into remains
          const lastItem = prev[prev.length - 1];
          remainsRef.current.push(lastItem);

          const updated = [...prev];
          updated[updated.length -1 ]= product;

          return updated

        })
  }

// Replace an item (by id) with the next from remains queue
  const refill = (id: number) => {
    setShopItems((prevItems) => {
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

  //Full reset
  const reset = () => initializeTheShop();

  const value = { items: shopItems, setShopItems, refill, reset, returnItem };
  return (
    <MyShopContext.Provider value={value}>{children}</MyShopContext.Provider>
  );
};

export default MyShopContext;
