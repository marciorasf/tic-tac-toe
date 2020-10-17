import {
  getWinnerPlayIfExists,
  getProcessedPossibleWinnerPlays,
  player1Markup,
  botMarkup,
} from "./utils";

export default function impossibleBotNextSquare(squares) {
  const processedWinnerPlays = getProcessedPossibleWinnerPlays(squares);

  const botWinnerSquareIndex = getWinnerPlayIfExists(
    processedWinnerPlays,
    botMarkup
  );

  if (botWinnerSquareIndex) {
    return botWinnerSquareIndex;
  }

  const userWinnerSquareIndex = getWinnerPlayIfExists(
    processedWinnerPlays,
    player1Markup
  );

  if (userWinnerSquareIndex) {
    return userWinnerSquareIndex;
  }

  const squaresWithRivalInfo = Array(9).fill(0);

  processedWinnerPlays.filter((play) => play[botMarkup] === 0);

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
