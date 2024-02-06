// features/gameSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 100,
  bets: [0, 0, 0, 0, 0, 0],
  timer: 10,
  winner: null,
  errorMessage: "",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setBets: (state, action) => {
      state.bets = action.payload;
    },
    setTimer: (state, action) => {
      state.timer = action.payload;
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setBalance, setBets, setTimer, setWinner, setErrorMessage } = gameSlice.actions;
export default gameSlice.reducer;
