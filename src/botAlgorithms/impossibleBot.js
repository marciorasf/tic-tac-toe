import { getOWinPlay, getNextStepPossibilites, getFreeSquares } from "./utils"

function impossibleBot(squares) {
  const winnerMove = getOWinPlay(squares);
  if (winnerMove !== false) return winnerMove;

  const freeSquares = getFreeSquares(squares);
  const steps = getNextStepPossibilites(squares, freeSquares);

  const xNeedPlays = [];
  for (let step of steps) {
    const stepResult = {
      square: step[0],
      1: 0,
      2: 0,
      3: 0,
    };
    step = step.slice(1);
    for (const play of step) {
      let xPlays = play.filter((sqr) => sqr === undefined);
      xPlays = xPlays.length;
      stepResult[xPlays] += 1;
    }
    xNeedPlays.push(stepResult);
  }

  xNeedPlays.sort((objA, objB) => {
    if (objA[1] !== objB[1]) return objA[1] - objB[1];
    if (objA[2] !== objB[2]) return objA[2] - objB[2];
    if (objA[3] !== objB[3]) return objA[3] - objB[3];
  });

  return xNeedPlays[0].square;
}

export default impossibleBot