import clsx from "clsx";
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
  Button,
} from "@material-ui/core";

import circleSymbol from "../../assets/images/circle.svg";
import timesSymbol from "../../assets/images/times.svg";
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
  player1: timesSymbol,
  player2: circleSymbol,
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
    setHasTied(false);
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

  function Squares() {
    return squares.map((square, index) => (
      <ButtonBase
        key={index}
        className={classes.cell}
        onClick={() => handleClickSquare(index)}
        disabled={square || areSquaresDisabled}
      >
        <img src={playerSymbols[square]} height={30} />
      </ButtonBase>
    ));
  }

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Grid container justify="center">
        <hr className={classes.dividerMedium} />

        <Typography variant="h1" component="h1">
          tic-tac-toe
        </Typography>

        <hr className={classes.dividerLarge} />

        <Grid item xs={12}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="mode">Mode</InputLabel>
                <Select
                  labelId="mode"
                  label="Mode"
                  onChange={handleModeChange}
                  value={mode}
                >
                  <MenuItem value="single">singleplayer</MenuItem>
                  <MenuItem value="multi">multiplayer</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl
                fullWidth
                disabled={mode !== "single"}
                variant="outlined"
              >
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

        <hr className={classes.dividerMedium} />

        <Grid item xs={12}>
          <Grid container justify="space-around">
            {Object.keys(playerSymbols).map((player) => {
              const isPlayerTurn =
                player === "player1" ? isPlayer1Turn : !isPlayer1Turn;

              return (
                <Grid item xs={3} key={player}>
                  <Typography
                    className={clsx(
                      classes.playerScore,
                      isPlayerTurn && classes.underlineScore
                    )}
                  >
                    <img src={playerSymbols[player]} height={10} />
                    <span>{winCounter[player]}</span>
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <hr className={classes.dividerMedium} />

        <Grid item xs={12}>
          <Grid container justify="center" alignItems="center">
            {currentWinner || hasTied ? (
              <Grid container justify="center" align="center" spacing={2}>
                <Grid item xs={12}>
                  <Typography component="p" className={classes.endGameMessage}>
                    {currentWinner ? (
                      <Typography>
                        <img src={playerSymbols[currentWinner]} height={20} />
                        Won!
                      </Typography>
                    ) : (
                      "Tied!"
                    )}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={restartGame}
                  >
                    Restart
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Box className={classes.table}>{Squares()}</Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
