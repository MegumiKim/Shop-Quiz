import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { useShop } from "../contexts/MyShopContext";

function Shop() {
  const { items, reset } = useShop();

  console.log(items.length);
  return (
    <div className="shop-wrapper">
      <div className="shelf">
        {items.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}

        {items.length < 1 && (
          <button className="reset_btn" onClick={reset}>
            START PÅ NYTT
          </button>
        )}
      </div>
    </div>
  );
}

export default Shop;
