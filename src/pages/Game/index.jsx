import React, { useState } from "react";

import { Box, Container, Grid } from "@material-ui/core";

import useStyles from "./styles";

const nSquares = 9;

export default function Game() {
  const [squares, setSquares] = useState(Array(nSquares).fill(undefined));
  const [isXTurn, setIsXTurn] = useState(true);

  const classes = useStyles();

  function handleClick(squareIndex) {
    const currentSquares = squares.slice();
    currentSquares[squareIndex] = isXTurn ? "X" : "O";
    setSquares(currentSquares);

    setIsXTurn(!isXTurn);
  }

  function Squares() {
    return squares.map((square, index) => (
      <Box
        key={index}
        className={classes.cell}
        onClick={() => handleClick(index)}
      >
        {square}
      </Box>
    ));
  }

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Box container className={classes.table}>
        {Squares()}
      </Box>
    </Container>
  );
}
