import React from "react";

import { Box, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import { Game } from "./pages";
import theme from "./styles/theme";
import "./styles/global.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box minHeight="100vh" display="flex" alignItems="center">
        <Game />
      </Box>
    </ThemeProvider>
  );
}

export default App;
