export const winPossibilites = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function getXWinPossibilites(squares) {
  let xWins = winPossibilites;
  xWins = xWins.map((line) => line.map((index) => squares[index]));
  xWins = xWins.filter((line) => !line.includes("O"));
  return xWins;
}

export function getFreeSquares(squares) {
  const freeSquares = squares.map((value, index) => (!value ? index : false));
  return freeSquares.filter((value) => value !== false);
}

export function getNextStepPossibilites(squares, freeSquares) {
  const steps = [];
  for (const square of freeSquares) {
    const squaresCopy = squares.slice();
    squaresCopy[square] = "O";
    steps.push([square, ...getXWinPossibilites(squaresCopy)]);
  }
  steps.sort((arrA, arrB) => arrA.length - arrB.length);
  return steps;
}

export function getOWinPlay(squares) {
  let oWins = winPossibilites;
  oWins = oWins.map((line) => line.map((index) => squares[index]));
  const oWinsJustO = oWins.map((line, index) => [
    index,
    ...line.filter((value) => value !== undefined && value !== "X"),
  ]);
  oWinsJustO.sort((arrA, arrB) => arrB.length - arrA.length);
  if (oWinsJustO[0].length === 3) {
    const winnerLine = oWinsJustO[0][0];
    const winnerSquare = oWins[winnerLine].findIndex(
      (value) => value === undefined
    );
    if (winnerSquare >= 0) return winPossibilites[winnerLine][winnerSquare];
  }
  return false;
}

export function randomInt(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min)) + min;
}
