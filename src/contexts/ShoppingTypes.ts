export interface ShoppingItem {
  id: string;
  name: string;
  price: number;
  note?: string;
}
export interface ShoppingState {
  items: ShoppingItem[];
}

//Actions
export type ShoppingAction =
  | { type: "ADD_ITEM"; payload: ShoppingItem }
  | { type: "DELETE_ITEM"; payload: { id: string } }
  | { type: "EDIT_ITEM"; payload: ShoppingItem }
  | { type: "DELETE_ALL" };
