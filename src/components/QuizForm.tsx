import React, { useState } from "react";
import { useCart } from "../contexts/MyCartContext";
import { usePoint } from "../contexts/PointContext";
import Confetti from "react-confetti";


interface Prop {
  currentAmount:number
  setQuizIndex: React.Dispatch<React.SetStateAction<number>>;
}

function QuizForm({currentAmount, setQuizIndex}:Prop) {
  const { items, emptyCart } = useCart();
  const { setPoint } = usePoint();

  //States for UX
  const [input, setInput] = useState<string>("");
  const [invalid, setInvalid] = useState(false);
  const [userMessage, setUserMessage] = useState("Hvor mye penger får du tilbake?");
  const [userSubMessage, setUserSubMessage] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const sum = items.reduce((acc, curr) => acc + curr.price, 0);
  const change = currentAmount - sum;


//utility for setting errors
const throwError = (msg:string, sub = "")=>{
  setInvalid(true);
  setUserMessage(msg);
  setUserSubMessage(sub);
  setBtnDisabled(true);
  setInput("");
}

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInvalid(false);


    //Cae: not enough money
    if(sum > currentAmount){
      return   throwError("Du har ikke nok penger.", "Fjern noen varene");
    }

    //convert string input to number
    const userAnswer = Number(input);

    if (userAnswer === change) {
      setUserMessage("Riktig 🎉");
      setUserSubMessage("Du har fått 1 poeng ⭐");
      setPoint((prev) => prev + 1);

      setBtnDisabled(true);
      setShowConfetti(true);
      
      const timeout = setTimeout(() => {
        //reset the quiz form for the next round
        setQuizIndex((prev:number) => prev + 1);
        
        if(currentAmount === 777){
          setQuizIndex(0) // back to the start
        }

        setUserMessage("Hvor mye penger får du tilbake?");
        setUserSubMessage("");
        emptyCart();
        setShowConfetti(false);
        setInput("");
      }, 3000); // Hide confetti after 3 seconds
      return () => clearTimeout(timeout);

    } 
      //wrong answer
      throwError("Feil 😭",`Hva blir ${currentAmount} - ${sum}?` )
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    //Only allow digits
    if(!/^\d*$/.test(value)){
      return throwError("SKTIV BARE TALL");
    }else{
      setInvalid(false);
      setInput(value);
      setBtnDisabled(value === "");
    }
  };

  const handleFocus = () => {
    setInvalid(false);
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
            // placeholder="0"
            className={invalid ? "invalid amount_input" : "amount_input"}
            onChange={handleChange}
            onFocus={handleFocus}
            value={input}
            disabled={items.length < 1}
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
