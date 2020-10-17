import easyBotNextSquare from "./easyBot";
import hardBotNextSquare from "./hardBot";
import impossibleBotNextSquare from "./impossibleBot";
import mediumBotNextSquare from "./mediumBot";

export function getBotNextSquare(bot, squares) {
  switch (bot) {
    case "easy":
      return easyBotNextSquare(squares);

    case "medium":
      return mediumBotNextSquare(squares);

    case "hard":
      return hardBotNextSquare(squares);

    case "impossible":
      return impossibleBotNextSquare(squares);

    default:
      return null;
  }
}
