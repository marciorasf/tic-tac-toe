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
      fontSize: "3rem",
      fontFamily: "Pacifico, sans-serif",
      color: "#222222",
    },
  },
});

export default theme;
