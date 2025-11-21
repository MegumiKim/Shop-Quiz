import React from "react";
import Points from "./Points";

function Header() {
  return (
    <header>
        <h1>Velkommen til butikken.
        <div>Hva vil du kjøpe i dag? 🛒</div>
      </h1>
      <Points />
    </header>
  );
}

export default Header;
