import React from "react";
import Shop from "../components/Shop";
import Cart from "../components/Cart";
import QuizForm from "../components/QuizForm";
import Header from "../components/Header";
function Main() {
  return (
    <div>
      <Header />
      <div className="mainWrapper">
        <div className="page_left">
          <Shop />
        </div>
        <div className="page_right">
          <QuizForm />
          <Cart />
        </div>
      </div>
    </div>
  );
}

export default Main;
