export const botSymbol = "O";
export const playerSymbol = "X";

export const winnerPlays = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function getFreeSquares(squares) {
  const freeSquares = [];

  squares.forEach((square, index) => {
    if (!square) {
      freeSquares.push(index);
    }
  });

  return freeSquares;
}

export function getNextWinnerPlayIfExists(squares, playerSymbol) {}

export function getWinnerPlaysPossibilities(square, playerSymbol) {}

export function calculateWinner(squares) {
  for (const play of winnerPlays) {
    const [a, b, c] = play;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export function randomInt(max) {
  return Math.floor(Math.random() * max);
}
