import { ShoppingAction, ShoppingState } from "../contexts/ShoppingTypes";

export const shoppingReducer = (
  state: ShoppingState,
  action: ShoppingAction
) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload.id),
      };

    case "EDIT_ITEM":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id ? action.payload : i
        ),
      };

    case "DELETE_ALL":
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};
