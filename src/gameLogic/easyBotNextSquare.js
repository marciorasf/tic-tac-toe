import { getFreeSquares, randomInt } from "./utils";

/*
 * Get random free square
 */

export default function easyBotNextSquare(squares) {
  const freeSquares = getFreeSquares(squares);
  const nextSquare = freeSquares[randomInt(freeSquares.length)];
  return nextSquare;
}
