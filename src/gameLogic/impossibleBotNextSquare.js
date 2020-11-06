import {
  getWinnerPlayIfExists,
  getWinnerPlaysWithInfo,
  player1Markup,
  botMarkup,
} from "./utils";

/*
 * Always make the plays that decrease at most the adversary possibilities
 */
export default function impossibleBotNextSquare(squares) {
  const processedWinnerPlays = getWinnerPlaysWithInfo(squares);

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
