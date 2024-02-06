// store.js
import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./GameSlice"; // Adjust the import path

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export default store;
