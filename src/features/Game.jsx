// features/Game.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBalance, setBets, setTimer, setWinner, setErrorMessage } from "../store/GameSlice";
import Dice from "../components/Dice";

const Game = () => {
  const dispatch = useDispatch();
  const { balance, bets, timer, winner, errorMessage } = useSelector((state) => state.game);
  const [winnerDisplayed, setWinnerDisplayed] = useState(false);

  const handleBetClick = (position) => {
    if (timer > 0 && timer < 10 && !winnerDisplayed) {
      if (balance > 0) {
        dispatch(setBets(bets.map((bet, index) => (position - 1 === index ? bet + 1 : bet))));
        dispatch(setBalance(balance - 1));
      } else {
        dispatch(setErrorMessage("Insufficient balance to place a bet."));
      }
    }
  };

  useEffect(() => {
    let interval;
    if (timer > 0 && !winnerDisplayed) {
      interval = setInterval(() => dispatch(setTimer(timer - 1)), 1000);
    } else if (timer === 0 && !winnerDisplayed) {
      clearInterval(interval);
      setTimeout(() => {
        const result = Math.floor(Math.random() * 6) + 1;
        console.log('Result=',result,'bets=',bets);
        const winningPosition = bets[result - 1] > 0 ? result : -1;
        dispatch(setWinner(winningPosition));
        console.log('Winning=',winningPosition);
        const winningAmount = winningPosition ? bets[winningPosition - 1] * 2 : 0;
        dispatch(
          setBalance(
            winningPosition >= 0
              ? balance + winningAmount
              : balance - bets.reduce((total, bet) => total + bet, 0)
          )
        );

        setWinnerDisplayed(true);
        setTimeout(() => {
          dispatch(setBets([0, 0, 0, 0, 0, 0]));
          dispatch(setWinner(null));
          dispatch(setTimer(10));
          dispatch(setErrorMessage(""));
          setWinnerDisplayed(false);
        }, 5000);
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [timer, bets, balance, dispatch, winnerDisplayed]);

  return (
    <div className="game-container">
      <h1>Balance: ${balance}</h1>
      <div className="dice-container">
        {bets.map((bet, index) => (
          <Dice
            key={index}
            value={index + 1}
            bet={bet}
            onClick={() => handleBetClick(index + 1)}
            disabled={timer === 0 || winnerDisplayed}
          />
        ))}
      </div>
      {!(winnerDisplayed || winner) && <p>Please Choose your bet</p>}
      <p>Timer: {timer} seconds</p>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {winner == -1 && winnerDisplayed &&  <p className="message">No winner from selected bets!</p>}
      {winner && winnerDisplayed && winner != -1 &&<p className="winner-message">Winner: {winner}</p>}
    </div>
  );
};

export default Game;
