import React, { useContext, useState } from "react";

import { Box, Container, Grid } from "@material-ui/core";

import { calculateWinner } from "../../gameLogic/utils";
import { store } from "../../store";
import useStyles from "./styles";

const nSquares = 9;

const playerSymbols = {
  player1: "X",
  player2: "0",
};

export default function Game() {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const [squares, setSquares] = useState(Array(nSquares).fill(undefined));
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
  const [winCounter, setWinCounter] = useState({ player1: 0, player2: 0 });

  const classes = useStyles();


  function handleClickSquare(squareIndex) {
    const currentSquares = squares.slice();
    currentSquares[squareIndex] = isPlayer1Turn ? "player1" : "player2";
    setSquares(currentSquares);

    const winner = calculateWinner(currentSquares);

    if (winner) {
      setWinCounter({
        ...winCounter,
        [winner]: winCounter[winner] + 1,
      });
    }

    setIsPlayer1Turn(!isPlayer1Turn);
  }

  function Squares() {
    return squares.map((square, index) => (
      <Box
        key={index}
        className={classes.cell}
        onClick={() => handleClickSquare(index)}
      >
        {playerSymbols[square]}
      </Box>
    ));
  }

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Grid container>
        <Grid item xs={12}>
          Player 1: {winCounter.player1}, Player 2: {winCounter.player2}
        </Grid>
        <Grid item xs={12}>
          <Box container className={classes.table}>
            {Squares()}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
