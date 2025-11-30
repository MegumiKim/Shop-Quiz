import React, { useState }  from "react";
import Shop from "../components/Shop";
import Cart from "../components/Cart";
import QuizForm from "../components/QuizForm";
import Header from "../components/Header";

function Main() {
  const quizArr = [50, 100, 150, 230, 370, 429, 520, 618, 777];
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const currentAmount = quizArr[quizIndex];

  return (
    <div>
        <Header />
      <div className="mainWrapper">
        <div className="page_left">
          <Shop />
        </div>
        <div className="page_right">
          <h2 className="">
            Du har <span className="currentAmount">{currentAmount} </span>kroner.
          </h2>
          <Cart />
          <QuizForm currentAmount={currentAmount} quizIndex={quizIndex} setQuizIndex={setQuizIndex}/>
        </div>
      </div>
    </div>
  );
}

export default Main;