// App.js
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Game from "./features/Game";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="app-container">
        <Game />
      </div>
    </Provider>
  );
};

export default App;
