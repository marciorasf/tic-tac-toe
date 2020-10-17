import {
  getWinnerPlayIfExists,
  getProcessedPossibleWinnerPlays,
  randomInt,
  getFreeSquares,
} from "./utils";

export default function mediumBotNextSquare(squares, botPlayer) {
  const processedWinnerPlays = getProcessedPossibleWinnerPlays(squares);

  const winnerSquareIndex = getWinnerPlayIfExists(
    processedWinnerPlays,
    botPlayer
  );

  if (winnerSquareIndex) {
    return winnerSquareIndex;
  }

  processedWinnerPlays.sort((playA, playB) => {
    const result = playB[botPlayer].length - playA[botPlayer].length;

    if (result === 0) {
      return Math.random() - 0.5;
    }

    return result;
  });

  const filteredPlays = processedWinnerPlays.filter(
    (play) => play[botPlayer].length + play.empty.length === 3
  );

  if (filteredPlays[0]) {
    return filteredPlays[0].empty[0];
  }

  const freeSquares = getFreeSquares(squares);
  return freeSquares[randomInt(freeSquares.length)];
}
