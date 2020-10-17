import impossibleBotNextSquare from "./impossibleBotNextSquare";
import mediumBotNextSquare from "./mediumBotNextSquare";
import { botMarkup } from "./utils";

export default function hardBotNextSquare(squares) {
  const impossibleBotRatio = 0.8;

  if (Math.random() < impossibleBotRatio) {
    impossibleBotNextSquare(squares, botMarkup);
  } else {
    mediumBotNextSquare(squares, botMarkup);
  }
}
