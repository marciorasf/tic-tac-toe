import { getFreeSquares, randomInt } from "./utils";

export default function easyBotNextSquare(squares) {
  const freeSquares = getFreeSquares(squares);

  const nextPlay = freeSquares[randomInt(freeSquares.length)];

  return nextPlay;
}
