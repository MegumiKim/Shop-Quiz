import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { useShop } from "../contexts/MyShopContext";

function Shop() {
  const { items, reset } = useShop();

  return (
    <div className="shop-wrapper">
        <h2>Hva vil du kjøpe i dag? 🛒 </h2>
      <div className="shelf">
        {items.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
        <div className="reset_wrapper">
          {items.length < 1 && (
            <button className="reset_btn" onClick={reset}>
              FYLL OPP
            </button>
          )}
        </div>
    </div>
  );
}

export default Shop;
