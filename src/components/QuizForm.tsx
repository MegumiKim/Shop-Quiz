import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/MyCartContext";
import { usePoint } from "../contexts/PointContext";
import Confetti from "react-confetti";

function QuizForm() {
  const { items, emptyCart } = useCart();
  const defaultMessage = "hvor mye koster det til sammen?";
  const { setPoint } = usePoint();
  const [input, setInput] = useState<number | string>("");
  const [invalid, setInvalid] = useState(false);
  const [userMessage, setUserMessage] = useState(defaultMessage);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInvalid(false);
    if (items.length < 2) {
      setInvalid(true);
      setUserMessage("Du må kjøpe minst 2 ting");
      return;
    }

    const sum = items.reduce((acc, curr) => acc + curr.price, 0);

    if (sum === input) {
      setPoint((prev) => prev + sum);
      setInvalid(false);
      setUserMessage(`riktig! Du har fått ${sum} poeng ⭐`);

      setInput("");
      setBtnDisabled(true);
      setShowConfetti(true);

      // Optional: Hide confetti after a duration
      setTimeout(() => {
        emptyCart();
        setShowConfetti(false);
        setUserMessage("Hva vil du kjøpe?");
      }, 7000); // Hide confetti after 5 seconds
    } else {
      if (sum < Number(input)) {
        setUserMessage("Det var for mye 😛");
      }
      if (sum > Number(input)) {
        setUserMessage("Det var for lite ☹️");
      }
      setInput("");
      setInvalid(true);
      setBtnDisabled(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(Number(e.target.value));
    setBtnDisabled(false);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setBtnDisabled(true);
    }
    setInvalid(false);
    setUserMessage(defaultMessage);
    setInput("");
  };

  return (
    <form className="payment_form">
      {showConfetti && <Confetti />}
      <p className="user-message">{userMessage}</p>
      <div className="input-wrapper">
        <label htmlFor="">NOK:</label>
        <input
          type="number"
          name="amount"
          placeholder="SKRIV INN BELØP"
          className={invalid ? "invalid amount_input" : "amount_input"}
          onChange={handleChange}
          onFocus={handleFocus}
          value={input}
          disabled={items.length < 1 ? true : false}
        />
      </div>
      <button className="pay_btn" onClick={handleClick} disabled={btnDisabled}>
        BETAL
      </button>
    </form>
  );
}

export default QuizForm;
