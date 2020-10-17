import {
  getWinnerPlayIfExists,
  getProcessedPossibleWinnerPlays,
  randomInt,
  getFreeSquares,
} from "./utils";

export default function impossibleBotNextSquare(squares, botPlayer) {
  const processedWinnerPlays = getProcessedPossibleWinnerPlays(squares);

  const botWinnerSquareIndex = getWinnerPlayIfExists(
    processedWinnerPlays,
    botPlayer
  );

  if (botWinnerSquareIndex) {
    return botWinnerSquareIndex;
  }

  const userWinnerSquareIndex = getWinnerPlayIfExists(
    processedWinnerPlays,
    "player1"
  );

  if (userWinnerSquareIndex) {
    return userWinnerSquareIndex;
  }

  const squaresWithRivalInfo = Array(9).fill(0);

  processedWinnerPlays.filter((play) => play[botPlayer] === 0);

  processedWinnerPlays.forEach((play) => {
    play.empty.forEach((squareIndex) => {
      squaresWithRivalInfo[squareIndex] += 1;
    });
  });

  const squareWithMaxRivalWinnerOptions = Math.max(...squaresWithRivalInfo);

  const nextSquare = squaresWithRivalInfo.findIndex(
    (value) => value === squareWithMaxRivalWinnerOptions
  );

  return nextSquare;
}
