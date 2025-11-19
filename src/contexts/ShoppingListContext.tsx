import React, { createContext, useEffect, useReducer } from "react";
import { initialItems } from "../initialValues";
import { ShoppingAction, ShoppingItem, ShoppingState } from "./ShoppingTypes";
import { shoppingReducer } from "../reducers/ShoppingReducer";

const initialState: ShoppingState = {
  items: initialItems,
};

export interface ShoppingContextType {
  items: ShoppingItem[];
  dispatch: React.Dispatch<ShoppingAction>;
}

export const ShoppingListContext = createContext<ShoppingContextType>({
  items: initialItems,
  dispatch: () => {
    throw new Error("Dispatch must be used within Provider!");
  },
});

export const ShoppingListContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(shoppingReducer, initialState);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <ShoppingListContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ShoppingListContext.Provider>
  );
};
