import impossibleBotNextSquare from "./impossibleBot";
import mediumBotNextSquare from "./mediumBot";
import { botMarkup } from "./utils";

export default function hardBotNextSquare(squares) {
  const impossibleBotRatio = 0.8;

  if (Math.random() < impossibleBotRatio) {
    impossibleBotNextSquare(squares, botMarkup);
  } else {
    mediumBotNextSquare(squares, botMarkup);
  }
}
