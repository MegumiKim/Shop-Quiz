import React from "react";
import { useCart } from "../contexts/MyCartContext";
import Thumbnail from "./Thumbnail";

function Cart() {
  const { items } = useCart();

  return (
    <div className="cart">
      {items.map((item) => (
        <Thumbnail item={item} key={item.id} />
      ))}
    </div>
  );
}

export default Cart;
