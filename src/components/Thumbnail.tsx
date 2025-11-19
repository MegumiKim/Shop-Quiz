import React from "react";
import { Product } from "../contexts/MyShopType";
import { useCart } from "../contexts/MyCartContext";

interface Prop {
  item: Product;
}
function Thumbnail({ item }: Prop) {
  const { removeItem } = useCart();

  return (
    <button className="thumbnail_wrapper" onClick={() => removeItem(item.id)}>
      <img src={`/${item.img}`} alt={item.name} className="thumbnail" />
      <p className="thumbnail_price">NOK {item.price}</p>
    </button>
  );
}

export default Thumbnail;
