import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/MyCartContext";
import { usePoint } from "../contexts/PointContext";
import Confetti from "react-confetti";

function QuizForm() {
  const { items, emptyCart } = useCart();
  const quizArr = [50, 100, 150, 200, 300, 450, 520, 618];
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const currentAmount = quizArr[quizIndex];
  const { setPoint } = usePoint();
  const [input, setInput] = useState<number | string>("");
  const [invalid, setInvalid] = useState(false);
  const [userMessage, setUserMessage] = useState(`Du har ${currentAmount} Kr.`);
  const defaultSubMessage = "Regn hvor mye penger du får tilbake.";
  const [userSubMessage, setUserSubMessage] = useState(defaultSubMessage);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);


  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInvalid(false);

    const sum = items.reduce((acc, curr) => acc + curr.price, 0);
    const change = currentAmount - sum;

    if(sum > currentAmount){
      setInvalid(true);
      setUserMessage("Du har ikke nok penger.");
      setUserSubMessage(`Du kan kjøpe opp til Kr. ${currentAmount}.`)
      return;
    }

    if (change === input) {
      setUserMessage("Riktig 🎉");
      setUserSubMessage("Du har fått 1 poeng ⭐");
      setPoint((prev) => prev + 1);
      setQuizIndex((prev) => prev + 1);
      setBtnDisabled(true);
      setShowConfetti(true);
  
      setTimeout(() => {
        //reset the quiz form for the next round
       setUserMessage(`Du har ${quizArr[quizIndex + 1]} Kr.`);
       setUserSubMessage(defaultSubMessage);
        emptyCart();
        setShowConfetti(false);
           setInput("");
      }, 6000); // Hide confetti after 7 seconds
    } else {
      setUserMessage("Feil 😭");
      setUserSubMessage(`Hva blir ${currentAmount} - ${sum}?`);
      setInvalid(true);
      setBtnDisabled(true);
      setInput("");
    }
 
     
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(isNaN(Number(e.target.value))){
      setInvalid(true);
      setUserMessage("SKRIV BARE TALL");
      setUserSubMessage("");
      setInput("")
    }else{
            setInvalid(false);
      setInput(Number(e.target.value));
      setBtnDisabled(false);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setBtnDisabled(true);
    }
    setInvalid(false);
    setUserMessage(`Du har ${currentAmount} Kr.`);
    setUserSubMessage(defaultSubMessage);
    setInput("");
  };

  return (
    <div>
      <form className="payment_form">
        {showConfetti && <Confetti />}
        <p className="user-message">{userMessage}</p>
        <p className="user-sub-message">{userSubMessage}</p>
        <div className="input-wrapper">
          <label htmlFor="">Kr:</label>
          <input
            type="text"
            name="amount"
            // placeholder="SKRIV INN BELØPET"
            className={invalid ? "invalid amount_input" : "amount_input"}
            onChange={handleChange}
            onFocus={handleFocus}
            value={input}
            disabled={items.length < 1 ? true : false}
          />
        </div>
        <button className="pay_btn" onClick={handleClick} disabled={btnDisabled}>
          Svar
        </button>
      </form>
    </div>
  );
}

export default QuizForm;
