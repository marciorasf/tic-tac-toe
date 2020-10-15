import React, { useContext, useState, useEffect } from "react";

import { Box, Container, Grid, ButtonBase, Button } from "@material-ui/core";

import { easyBotNextSquare } from "../../gameLogic";
import { calculateWinner, calculateTie } from "../../gameLogic/utils";
import { store } from "../../store";
import useStyles from "./styles";

const nSquares = 9;

const playerSymbols = {
  player1: "X",
  player2: "0",
};

const initialSquares = Array(nSquares).fill(undefined);

export default function Game() {
  const globalState = useContext(store);

  const [squares, setSquares] = useState(initialSquares);
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
  const [winCounter, setWinCounter] = useState({ player1: 0, player2: 0 });
  const [currentWinner, setCurrentWinner] = useState(null);
  const [hasTied, setHasTied] = useState(false);
  const [areSquaresDisabled, setAreSquaresDisabled] = useState(false);

  const classes = useStyles();

  function restartGame() {
    setCurrentWinner(null);
    setSquares(initialSquares);
  }

  function handleClickSquare(squareIndex) {
    const currentSquares = squares.slice();
    currentSquares[squareIndex] = isPlayer1Turn ? "player1" : "player2";
    setSquares(currentSquares);

    setIsPlayer1Turn(!isPlayer1Turn);
  }

  function triggerBotPlay() {
    const nextSquare = easyBotNextSquare(squares);
    handleClickSquare(nextSquare);
    setAreSquaresDisabled(false);
  }

  function Squares() {
    return squares.map((square, index) => (
      <ButtonBase
        key={index}
        className={classes.cell}
        onClick={() => handleClickSquare(index)}
        disabled={square || areSquaresDisabled}
      >
        {playerSymbols[square]}
      </ButtonBase>
    ));
  }

  function incrementWinCounter(winner) {
    setWinCounter({
      ...winCounter,
      [winner]: winCounter[winner] + 1,
    });
  }

  function isBotTurn() {
    return !isPlayer1Turn && globalState.state.mode === "single";
  }

  useEffect(() => {
    const winner = calculateWinner(squares);

    if (winner) {
      setCurrentWinner(winner);
      incrementWinCounter(winner);
    }

    setHasTied(calculateTie(squares));

    if (isBotTurn()) {
      setAreSquaresDisabled(true);
      triggerBotPlay();
    }
  }, [squares]);

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Grid container>
        <Grid item xs={12}>
          Player 1: {winCounter.player1}, Player 2: {winCounter.player2}
        </Grid>
        <Grid item xs={12}>
          {currentWinner || hasTied ? (
            <Grid
              container
              justify="center"
              alignItems="center"
              onClick={restartGame}
            >
              {currentWinner ? `${currentWinner} won` : "Tied"}
              <br />
              Click again to restart
            </Grid>
          ) : (
            <Box container className={classes.table}>
              {Squares()}
            </Box>
          )}
        </Grid>
        <Button onClick={restartGame}>Restart</Button>
      </Grid>
    </Container>
  );
}
