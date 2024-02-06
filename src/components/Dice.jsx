// components/Dice.js
import React from "react";

const Dice = ({ value, bet, onClick }) => {
  return (
    <div className="dice">
      <p>Dice {value}</p>
      <p>Bet: ${bet}</p>
      <button onClick={onClick} disabled={bet > 0}>
        +$1
      </button>
    </div>
  );
};

export default Dice;
