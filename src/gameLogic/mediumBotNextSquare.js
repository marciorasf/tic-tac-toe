import {
  getWinnerPlayIfExists,
  getWinnerPlaysWithInfo,
  randomInt,
  getFreeSquares,
  botMarkup,
} from "./utils";

/*
 * Choose a square of the play combination that needs less plays to finish
 * If there is no way to win, choose a random free square
 */
export default function mediumBotNextSquare(squares) {
  const winnerPlaysWithInfo = getWinnerPlaysWithInfo(squares);

  const winnerSquareIndex = getWinnerPlayIfExists(
    winnerPlaysWithInfo,
    botMarkup
  );

  if (winnerSquareIndex) {
    return winnerSquareIndex;
  }

  // sort plays by number of bot squares (descending)
  winnerPlaysWithInfo.sort((playA, playB) => {
    const result = playB[botMarkup].length - playA[botMarkup].length;

    if (result === 0) {
      return Math.random() - 0.5;
    }

    return result;
  });

  // removes plays that have rival squares
  const possibleWinnerPlays = winnerPlaysWithInfo.filter(
    (play) => play[botMarkup].length + play.empty.length === 3
  );

  // if there is at least one possible winner play, return it
  const nextPlay = possibleWinnerPlays[0];
  if (nextPlay) {
    return nextPlay.empty[randomInt(nextPlay.empty.length)];
  }

  const freeSquares = getFreeSquares(squares);
  return freeSquares[randomInt(freeSquares.length)];
}
