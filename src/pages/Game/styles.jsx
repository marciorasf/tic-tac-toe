import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => {
  const cellSize = 120;
  const cellBorderWidth = "2px";
  const cellBorderColor = "black";

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
      maxWidth: cellSize * 3,
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
        borderRight: `${cellBorderWidth} solid ${cellBorderColor}`,
        borderLeft: `${cellBorderWidth} solid ${cellBorderColor}`,
      },

      "& $cell:nth-child(n + 4)": {
        borderTop: `${cellBorderWidth} solid ${cellBorderColor}`,
      },
    },
    cell: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    endGameMessageContainer: {
      position: "absolute",
      height: "100%",
      width: "100%",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.25)",
      backdropFilter: "blur(5px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
    winnerText: {
      fontSize: 40,
      textTransform: "uppercase",

      "& img": {
        paddingRight: theme.spacing(3),
        height: 32,
      },
    },
  };
});
