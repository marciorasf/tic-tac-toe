
import {getOWinPlay, getNextStepPossibilites, randomInt, getFreeSquares} from "./utils"

function mediumBot(squares) {
  const winnerMove = getOWinPlay(squares);
  if (winnerMove !== false) return winnerMove;

  const freeSquares = getFreeSquares(squares);
  let steps = getNextStepPossibilites(squares, freeSquares);
  const minLength = steps[0].length;
  steps = steps.filter((arr) => arr.length === minLength);
  return steps[randomInt(0, steps.length)][0];
}

export default mediumBot