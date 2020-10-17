import React from "react";

import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import { Game } from "./pages";
import theme from "./styles/theme";
import "./styles/global.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Game />
    </ThemeProvider>
  );
}

export default App;
