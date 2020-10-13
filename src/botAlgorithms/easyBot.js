
import { getFreeSquares, randomInt } from "./utils"

function easyBot(squares) {
  const freeSquares = getFreeSquares(squares);
  return freeSquares[randomInt(0, freeSquares.length)];
}

export default easyBot