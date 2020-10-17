import impossibleBotNextSquare from "./impossibleBot";
import mediumBotNextSquare from "./mediumBot";

export default function hardBotNextSquare(squares, botPlayer) {
  const impossibleBotRatio = 0.8;

  if (Math.random() < impossibleBotRatio) {
    impossibleBotNextSquare(squares, botPlayer);
  } else {
    mediumBotNextSquare(squares, botPlayer);
  }
}
