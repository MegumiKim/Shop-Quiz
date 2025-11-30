import React from "react";
import { Product } from "../contexts/MyShopType";
import { useCart } from "../contexts/MyCartContext";
import { useShop } from "../contexts/MyShopContext";

interface Prop {
  item: Product;
}

function ProductCard({ item }: Prop) {
  const { addItem } = useCart();
  const { refill } = useShop();

  const handleClick = () => {
    addItem(item);
    refill(item.id);
  };

  return (
    <div className="product_card" onClick={handleClick}>
      <p className="card_title">{item.name.toLocaleUpperCase()}</p>
      <div className="img-wrapper">
        <img className="product_img" src={`/${item.img}`} alt={item.name} />
      </div>
      <h3> NOK {item.price}</h3>
    </div>
  );
}

export default ProductCard;
