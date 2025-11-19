import React, { useContext, useState } from "react";
import { ShoppingListContext } from "../contexts/ShoppingListContext";
import { ShoppingItem } from "../contexts/ShoppingTypes";

interface Prop {
  item: ShoppingItem;
}

//actions

function ItemCard({ item }: Prop) {
  const { dispatch } = useContext(ShoppingListContext);

  const newItem = {
    id: item.id,
    name: "New Item",
    price: 100,
    note: "New Item",
  };

  const handleEdit = () => {
    dispatch({
      type: "EDIT_ITEM",
      payload: newItem,
    });
  };
  const handleDelete = () => {
    dispatch({
      type: "DELETE_ITEM",
      payload: { id: item.id },
    });
  };

  return (
    <li>
      <h2>{item.name}</h2>
      <p>{item.price} NOK</p>
      <p>{item.note}</p>
      <button className="AddToList-btn" onClick={handleEdit}>
        Edit
      </button>
      <button className="AddToList-btn" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

export default ItemCard;
