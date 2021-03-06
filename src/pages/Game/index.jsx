import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { FaGithub as GithubIcon } from "react-icons/fa";
import { FiSettings as SettingsIcon } from "react-icons/fi";

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
  IconButton,
  Link,
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

const gameStates = {
  waitingPlay: "WAITING_PLAY",
  endTurn: "END_TURN",
  showingWinnerPlay: "SHOWING_WINNER_PLAY",
  winner: "WINNER",
  tied: "TIED",
  waitingBot: "WAITING_BOT",
};

export default function Game() {
  const [mode, setMode] = useState("single");
  const [botDifficult, setBotDifficult] = useState("hard");
  const [openSettings, setOpenSettings] = useState(false);

  const [squares, setSquares] = useState(initialSquares);
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
  const [currentWinner, setCurrentWinner] = useState(null);
  const [winnerPlayIndex, setWinnerPlayIndex] = useState(null);
  const [gameState, setGameState] = useState(gameStates.waitingPlay);

  const [winCounter, setWinCounter] = useState({ player1: 0, player2: 0 });

  const classes = useStyles({ winnerPlayIndex })();

  function handleToggleOpenSettings() {
    setOpenSettings(!openSettings);
  }

  function handleModeChange(event) {
    const { value } = event.target;
    setMode(value);
  }

  function handleBotDifficultChange(event) {
    const { value } = event.target;
    setBotDifficult(value);
  }

  function isBotTurn() {
    return (
      !isPlayer1Turn &&
      mode === "single" &&
      gameState === gameStates.waitingPlay
    );
  }

  function incrementWinCounter(winner) {
    setWinCounter({
      ...winCounter,
      [winner]: winCounter[winner] + 1,
    });
  }

  function handleClickSquare(squareIndex) {
    const currentSquares = squares.slice();
    currentSquares[squareIndex] = isPlayer1Turn ? player1Markup : player2Markup;
    setSquares(currentSquares);
    setGameState(gameStates.endTurn);
  }

  function triggerBotPlay() {
    setGameState(gameStates.waitingBot);

    const nextSquare = getBotNextSquare(botDifficult, squares);

    setTimeout(() => {
      handleClickSquare(nextSquare);
    }, 250);
  }

  function isEndGame() {
    return gameState === gameStates.winner || gameState === gameStates.tied;
  }

  function restartGame() {
    setCurrentWinner(null);
    setSquares(initialSquares);
    setWinnerPlayIndex(null);
    setGameState(gameStates.waitingPlay);
  }

  function verifyIfGameEnded() {
    const winnerInfo = calculateWinner(squares);

    if (winnerInfo) {
      const { winner, winnerPlayIndex: playIndex } = winnerInfo;
      setWinnerPlayIndex(playIndex);
      setCurrentWinner(winner);
      incrementWinCounter(winner);

      setTimeout(() => {
        setGameState(gameStates.winner);
      }, 500);

      return true;
    }

    const hasTied = calculateTie(squares);
    if (hasTied) {
      setGameState(gameStates.tied);
      return true;
    }

    return false;
  }

  useEffect(() => {
    if (gameState === gameStates.endTurn) {
      setIsPlayer1Turn(!isPlayer1Turn);

      if (!verifyIfGameEnded()) {
        setGameState(gameStates.waitingPlay);
      }
    }

    if (isBotTurn()) {
      triggerBotPlay();
    }
    // eslint-disable-next-line
  }, [squares, gameState]);

  const Squares = () =>
    squares.map((square, index) => (
      <ButtonBase
        key={index}
        className={classes.boardCell}
        onClick={() => handleClickSquare(index)}
        disabled={square || gameState === gameStates.waitingBot}
      >
        {square && (
          <img
            src={playerSymbols[square]}
            height={30}
            alt={square ? "square symbol" : ""}
          />
        )}
      </ButtonBase>
    ));

  return (
    <Container disableGutters maxWidth={false} className={classes.container}>
      <Grid container justify="center">
        <hr className={classes.dividerMedium} />

        <Grid item xs={12}>
          <Grid container justify="space-between">
            <Grid item xs={2}></Grid>

            <Grid item xs={8}>
              <Grid container justify="center">
                <Typography variant="h1" component="h1">
                  tic-tac-toe
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={2}>
              <Grid container justify="flex-end">
                <IconButton
                  onClick={handleToggleOpenSettings}
                  className={classes.settingsIcon}
                >
                  <SettingsIcon style={{ fontSize: "2rem" }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <hr className={classes.dividerLarge} />

        {openSettings && (
          <>
            <Grid item xs={12}>
              <Grid container spacing={6}>
                <Grid item xs={6}>
                  <FormControl fullWidth size="small" color="secondary">
                    <InputLabel id="mode">Mode</InputLabel>
                    <Select
                      labelId="mode"
                      label="Mode"
                      onChange={handleModeChange}
                      value={mode}
                    >
                      <MenuItem value="single">Singleplayer</MenuItem>
                      <MenuItem value="multi">Multiplayer</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl
                    fullWidth
                    disabled={mode !== "single"}
                    size="small"
                    color="secondary"
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

            <hr className={classes.dividerLarge} />
          </>
        )}

        <Grid item xs={12}>
          <Grid container spacing={6}>
            {Object.keys(playerSymbols).map((player) => {
              const isPlayerTurn =
                player === "player1" ? isPlayer1Turn : !isPlayer1Turn;

              return (
                <Grid item xs={6} key={player}>
                  <Typography
                    className={clsx(
                      classes.playerScore,
                      isPlayerTurn && classes.activePlayer
                    )}
                  >
                    <img
                      src={playerSymbols[player]}
                      height={10}
                      alt={`${player} symbol`}
                    />
                    <span>{winCounter[player]}</span>
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <hr className={classes.dividerLarge} />

        <Grid item xs={12}>
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ position: "relative" }}
          >
            <Box className={classes.board}>
              {Squares()}

              {isEndGame() && (
                <Grid
                  item
                  xs={12}
                  className={classes.endGameContainer}
                  onClick={restartGame}
                >
                  <Typography
                    component="p"
                    variant="h2"
                    className={classes.endGameText}
                  >
                    {gameState === gameStates.winner ? (
                      <>
                        <img
                          src={playerSymbols[currentWinner]}
                          alt={`${currentWinner} symbol`}
                        />
                        Won!
                      </>
                    ) : (
                      "Tied!"
                    )}
                  </Typography>

                  <hr className={classes.dividerMedium} />

                  <Typography component="p" variant="body1">
                    Click to restart.
                  </Typography>
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <hr className={classes.dividerLarge} />

          <Grid container alignItems="center" direction="column" spacing={4}>
            <Grid item>
              <Link href="https://github.com/marciorasf" variant="h3">
                @marciorasf
              </Link>
            </Grid>

            <Grid item>
              <Link href="https://github.com/marciorasf/tic-tac-toe">
                <GithubIcon style={{ fontSize: "3.5rem" }} />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
