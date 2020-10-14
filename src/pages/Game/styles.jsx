import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => {
  const cellSize = 120;

  return {
    container:{
      display: "flex",
      justifyContent: "center"
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
  };
});
