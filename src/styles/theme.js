import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#88d57a",
    },
    secondary: {
      main: "#03056d",
    },
  },
  typography: {
    fontFamily: "Nunito, sans-serif",
    h1: {
      fontSize: "3rem",
      fontFamily: "Pacifico, sans-serif",
      color: "#fd9cbc",
    },
    h2: {
      fontSize: "2.8rem",
      fontWeight: "500",
    },
    h3: {
      fontSize: "1.8rem",
      fontFamily: "Pacifico, sans-serif",
    },
    body1: {
      fontSize: "1.2rem",
      fontWeight: 400,
    },
  },
});

export default theme;
