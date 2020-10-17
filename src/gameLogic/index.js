import easyBotNextSquare from "./easyBot";
import hardBotNextSquare from "./hardBot";
import impossibleBotNextSquare from "./impossibleBot";
import mediumBotNextSquare from "./mediumBot";

export function getBotNextSquare(bot, squares, player) {
  switch (bot) {
    case "easy":
      return easyBotNextSquare(squares);

    case "medium":
      return mediumBotNextSquare(squares, player);

    case "hard":
      return hardBotNextSquare(squares, player);

    case "impossible":
      return impossibleBotNextSquare(squares, player);

    default:
      return null;
  }
}
