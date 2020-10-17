import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fe6b35",
    },
    secondary: {
      main: "#00ff00",
    },
  },
  typography: {
    h1: {
      fontSize: "4rem",
      fontFamily: "Pacifico, sans-serif",
      color: "#333333",
    },
    h2: {
      fontSize: "3rem",
      fontFamily: "Pacifico, sans-serif",
      color: "#333333",
    },
  },
});

export default theme;
