import { createMuiTheme } from "@material-ui/core/styles";

import colors from "./colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
  },
  typography: {
    h1: {
      fontSize: "5rem",
    },
  },
});

export default theme;
