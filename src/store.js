import React, { createContext, useReducer } from "react";

const initialState = {
  mode: "single",
  botDifficult: "impossible",
  player1Name: "Player 1",
  player2Name: "Player 2",
};

const store = createContext(initialState);

const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((currentState, action) => {
    switch (action.type) {
      case "UPDATE":
        return {
          ...currentState,
          ...action.value,
        };

      default:
        return currentState;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
