import React from "react";
import { useCart } from "../contexts/MyCartContext";
import Thumbnail from "./Thumbnail";

function Cart() {
  const { items, emptyCart } = useCart();

  return (
    <div className="cart">
      {items.map((item) => (
        <Thumbnail item={item} key={item.id} />
      ))}
      <button onClick={emptyCart} className="clear_btn">
        Tom
      </button>
    </div>
  );
}

export default Cart;
