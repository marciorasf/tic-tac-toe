import React from "react";

import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import Routes from "./routes";
import { StateProvider } from "./store";
import theme from "./styles/theme";
import "./styles/global.css";

function App() {
  return (
    <StateProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </StateProvider>
  );
}

export default App;
