export const player1Markup = "player1";
export const player2Markup = "player2";
export const botMarkup = "player2";

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

/*
 * return an array with an object for each of winnerPlays elements
 * the objects have the following format
 * {
 *   playIndex: number,
 *   empty: [indexes of the empty squares of the play],
 *   player1: [indexes of the player1 squares of the play],
 *   player2: [indexes of the player2 squares of the play]
 * }
 */
export function getWinnerPlaysWithInfo(squares) {
  return winnerPlays.map((play, index) => {
    const processedPlay = {
      playIndex: index,
      empty: [],
      player1: [],
      player2: [],
    };

    play.forEach((squareIndex) => {
      const square = squares[squareIndex];

      if (square === "player1") {
        processedPlay.player1.push(squareIndex);
      } else if (square === "player2") {
        processedPlay.player2.push(squareIndex);
      } else {
        processedPlay.empty.push(squareIndex);
      }
    });

    return processedPlay;
  });
}

export function getWinnerPlayIfExists(winnerPlaysWithInfo, player) {
  for (const play of winnerPlaysWithInfo) {
    if (play[player].length === 2 && play.empty.length === 1) {
      return play.empty[0];
    }
  }

  return false;
}

export function calculateWinner(squares) {
  for (const play of winnerPlays) {
    const [a, b, c] = play;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export function calculateTie(squares) {
  const freeSquares = getFreeSquares(squares);

  return freeSquares.length === 0;
}

export function randomInt(max) {
  return Math.floor(Math.random() * max);
}
