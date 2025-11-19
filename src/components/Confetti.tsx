import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const MyConfettiComponent = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize(); // Custom hook to get window dimensions

  // Example: Trigger confetti after a certain action or delay
  useEffect(() => {
    // You would typically trigger this based on a user action (e.g., button click, form submission)
    // For demonstration, let's trigger it after a delay
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 1000); // Show confetti after 1 second

    // Optional: Hide confetti after a duration
    const hideTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000); // Hide confetti after 5 seconds

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div>
      {showConfetti && <Confetti width={width} height={height} />}
      <h1>Congratulations!</h1>
    </div>
  );
};

// Example custom hook for window size
const useWindowSize = () => {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
};

export default MyConfettiComponent;
