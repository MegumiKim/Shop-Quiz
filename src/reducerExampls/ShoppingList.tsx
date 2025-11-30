import React, { useContext, useState } from "react";

import ItemCard from "./ItemCard";

import { ShoppingListContext } from "./ShoppingListContext";
import { ShoppingItem } from "../contexts/ShoppingTypes";
import { debounce } from "../tools/debounce";

function ShoppingList() {
  const { items, dispatch } = useContext(ShoppingListContext);
  const [item, setItem] = useState<ShoppingItem>({
    name: "",
    price: 0,
    id: "c",
  });

  const itemCards = items.map((item) => <ItemCard item={item} key={item.id} />);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, name: e.target.value });
  };

  const addItem = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        ...item,
        id: crypto.randomUUID(),
      },
    });
  };

  const debounceChange = debounce(handleChange, 500);

  const clearList = () => {
    localStorage.removeItem("items");
    dispatch({
      type: "DELETE_ALL",
    });
  };

  return (
    <div>
      <h2>ShoppingList</h2>
      <p>Current Item:{item.name}</p>
      <button onClick={clearList}>clear</button>
      <ul>{itemCards}</ul>

      <input
        type="text"
        placeholder="item"
        className="AddToList-input"
        onChange={debounceChange}
        name="item"
      />
      <input
        type="text"
        placeholder="item"
        className="AddToList-input"
        onChange={debounceChange}
        name="price"
      />

      <button className="AddToList-btn" onClick={addItem}>
        Add
      </button>
    </div>
  );
}

export default ShoppingList;
