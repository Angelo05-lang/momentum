import React, { useState, useEffect } from "react";

function Timer({ duration, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(Number(duration));

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onComplete) onComplete();
      return;
    }
    const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft, onComplete]);

  return <div style={{ fontWeight: "bold" }}>Tempo restante: {timeLeft} secondi</div>;
}

export default Timer;
