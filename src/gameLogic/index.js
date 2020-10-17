import easyBotNextSquare from "./easyBotNextSquare";
import hardBotNextSquare from "./hardBotNextSquare";
import impossibleBotNextSquare from "./impossibleBotNextSquare";
import mediumBotNextSquare from "./mediumBotNextSquare";

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
