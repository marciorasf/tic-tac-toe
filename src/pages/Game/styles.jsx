import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => {
  const cellSize = 120;

  return {
    dividerSmall: {
      width: "100%",
      margin: theme.spacing(0.5, 0),
      border: 0,
    },
    dividerMedium: {
      width: "100%",
      margin: theme.spacing(1.5, 0),
      border: 0,
    },
    dividerLarge: {
      width: "100%",
      margin: theme.spacing(3, 0),
      border: 0,
    },
    container: {
      display: "flex",
      justifyContent: "center",
    },
    playerScore: {
      fontSize: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "2px solid grey",

      "&>img": {
        height: 18,
      },
    },
    underlineScore: {
      borderBottom: "2px solid red",
    },
    table: {
      position: "relative",
      display: "grid",
      gridTemplateRows: `repeat(3, ${cellSize}px)`,
      gridTemplateColumns: `repeat(3, ${cellSize}px)`,

      "& $cell:nth-child(3n + 2)": {
        borderRight: "1px solid black",
        borderLeft: "1px solid black",
      },

      "& $cell:nth-child(n + 4)": {
        borderTop: "1px solid black",
      },
    },
    cell: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    endGameMessage: {
      position: "absolute",
      height: "100%",
      width: "100%",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.25)",
      backdropFilter: "blur(3px)",
      textTransform: "uppercase",
      fontSize: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      "& img": {
        paddingRight: theme.spacing(3),
        height: 32,
      },
    },
  };
});
