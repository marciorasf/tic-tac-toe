import React, { useState, useEffect } from "react";

import {
  Box,
  Container,
  Grid,
  ButtonBase,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@material-ui/core";

import { getBotNextSquare } from "../../gameLogic";
import {
  calculateWinner,
  calculateTie,
  player1Markup,
  player2Markup,
} from "../../gameLogic/utils";
import useStyles from "./styles";

const nSquares = 9;

const playerSymbols = {
  player1: "X",
  player2: "0",
};

const initialSquares = Array(nSquares).fill(undefined);

export default function Game() {
  const [squares, setSquares] = useState(initialSquares);
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
  const [winCounter, setWinCounter] = useState({ player1: 0, player2: 0 });
  const [currentWinner, setCurrentWinner] = useState(null);
  const [hasTied, setHasTied] = useState(false);
  const [areSquaresDisabled, setAreSquaresDisabled] = useState(false);
  const [mode, setMode] = useState("single");
  const [botDifficult, setBotDifficult] = useState("impossible");

  const classes = useStyles();

  function handleModeChange(event) {
    const { value } = event.target;
    setMode(value);
  }

  function handleBotDifficultChange(event) {
    const { value } = event.target;
    setBotDifficult(value);
  }

  function restartGame() {
    setCurrentWinner(null);
    setSquares(initialSquares);
  }

  function incrementWinCounter(winner) {
    setWinCounter({
      ...winCounter,
      [winner]: winCounter[winner] + 1,
    });
  }

  function isBotTurn() {
    return !isPlayer1Turn && mode === "single";
  }

  function handleClickSquare(squareIndex) {
    const currentSquares = squares.slice();
    currentSquares[squareIndex] = isPlayer1Turn ? player1Markup : player2Markup;
    setSquares(currentSquares);

    const winner = calculateWinner(currentSquares);

    if (winner) {
      setCurrentWinner(winner);
      incrementWinCounter(winner);
    }

    setHasTied(calculateTie(squares));

    setIsPlayer1Turn(!isPlayer1Turn);
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

  function triggerBotPlay() {
    setAreSquaresDisabled(true);

    const nextSquare = getBotNextSquare(botDifficult, squares);
    handleClickSquare(nextSquare);

    setAreSquaresDisabled(false);
  }

  useEffect(() => {
    if (isBotTurn()) {
      triggerBotPlay();
    }
  }, [squares]);

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Tic Tac Toe
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="mode">Mode</InputLabel>
                <Select
                  labelId="mode"
                  label="Mode"
                  onChange={handleModeChange}
                  value={mode}
                >
                  <MenuItem value="single">single-player</MenuItem>
                  <MenuItem value="multi">multiplayer</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth disabled={mode !== "single"}>
                <InputLabel id="botDifficult">Bot difficult</InputLabel>
                <Select
                  labelId="botDifficult"
                  label="Bot difficult"
                  onChange={handleBotDifficultChange}
                  value={botDifficult}
                >
                  <MenuItem value="easy">Easy</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="hard">Hard</MenuItem>
                  <MenuItem value="impossible">Impossible</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="space-around">
                <Grid item xs={3}>
                  <Typography>Player 1: {winCounter.player1} </Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography>
                    {mode === "single" ? "bot" : "Player 2"}:{" "}
                    {winCounter.player2}
                  </Typography>
                </Grid>
              </Grid>
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
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
