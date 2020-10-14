import React from "react";

import Routes from "./routes";
import { StateProvider } from "./store";
import "./styles/global.css";

function App() {
  return (
    <StateProvider>
      <Routes />
    </StateProvider>
  );
}

export default App;
