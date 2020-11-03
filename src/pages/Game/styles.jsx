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

      "&>img": {
        height: 20,
      },
    },
    underlineScore: {
      borderBottom: "2px solid red",
    },
    table: {
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
      textTransform: "uppercase",
    },
  };
});
