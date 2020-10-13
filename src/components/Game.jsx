import React from "react"
import Board from "./Board"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons"
import {easyBot, mediumBot, impossibleBot} from "../botAlgorithms"

const icons = {
  X: <FontAwesomeIcon icon={faTimes} />,
  O: <FontAwesomeIcon icon={faCircle} />,
};

const winPossibilites = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const squaresDefault = Array(9).fill(undefined);

function calculateWinner(squares) {
  const lines = winPossibilites;
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  const checkedSquares = squares.filter((i) => i === undefined);
  if (checkedSquares.length === 0) return "T";

  return null;
}

function jsonClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: undefined,
      botAlgorithm: undefined,
      players: {
        X: { name: "Player 1", wins: 0 },
        O: { name: "Bot", wins: 0 },
      },
      squares: squaresDefault.slice(),
      xIsNext: true,
      currentPage: "home",
      hasEnded: false,
      nGames: 0,
    };
  }

  restartGame() {
    this.setState({
      squares: squaresDefault.slice(),
      xIsNext: this.state.nGames % 2 === 0,
      hasEnded: false,
    });
  }

  resetGame() {
    const players = jsonClone(this.state.players);
    players["X"].wins = 0;
    players["O"].wins = 0;
    this.setState({
      currentPage: "home",
      players: players,
    });

    this.restartGame();
  }

  handleModeSelect(mode) {
    const players = jsonClone(this.state.players);
    players["O"].name = mode === "single" ? "Bot" : "Player 2";

    this.setState({
      botAlgorithm: impossibleBot,
      players: players,
      mode: mode,
      currentPage: "names",
    });
  }

  renderHome() {
    return (
      <div className="mode-selection">
        <button className="btn btn_depth" onClick={() => this.handleModeSelect("single")}>
          1 player
        </button>
        <button className="btn btn_depth" onClick={() => this.handleModeSelect("multi")}>
          2 players
        </button>
      </div>
    );
  }

  handleNamesSubmit(event) {
    event.persist();
    event.preventDefault();

    const players = jsonClone(this.state.players);
    players["X"].name = event.target.elements["inputPlayerX"].value;
    players["O"].name = event.target.elements["inputPlayerO"].value;

    let botAlgorithm = undefined;
    if (this.state.mode === "single") {
      const difficulty = event.target.elements["difficultySelect"].value;
      if (difficulty === "easy") botAlgorithm = easyBot;
      else if (difficulty === "medium") botAlgorithm = mediumBot;
      else if (difficulty === "impossible") botAlgorithm = impossibleBot;
    }

    this.setState({
      players: players,
      squares: squaresDefault.slice(),
      botAlgorithm: botAlgorithm,
      currentPage: "playing",
      xIsNext: true,
    });
  }

  renderInputNames() {
    const select =
      this.state.mode === "single" ? (
        <select name="difficultySelect" className="select" defaultValue="easy">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="impossible">Impossible</option>
        </select>
      ) : null;

    return (
      <div className="game-container">
        <form className="names-form" onSubmit={(evt) => this.handleNamesSubmit(evt)}>
          <label htmlFor="inputPlayerX">{icons["X"]}:</label>
          <input id="inputPlayerX" name="inputPlayerX" type="text" defaultValue={this.state.players["X"].name} />

          <label htmlFor="inputPlayerO">{icons["O"]}:</label>
          <input id="inputPlayerO" name="inputPlayerO" type="text" defaultValue={this.state.players["O"].name} />
          {select}
          <div className="btn-row">
            <button className="btn btn_play" type="submit">
              Play
            </button>
            <button
              className="btn btn_home"
              onClick={() => {
                this.resetGame();
              }}
              type="click"
            >
              Home
            </button>
          </div>
        </form>
      </div>
    );
  }

  handleSquareClick(index) {
    const squares = this.state.squares.slice();
    if (this.state.hasEnded) {
      this.setState({
        nGames: this.state.nGames + 1,
      });
      this.restartGame();
      return;
    }
    if (squares[index]) return;

    squares[index] = this.state.xIsNext ? "X" : "O";

    let winner = calculateWinner(squares);
    if (winner === "X" || winner === "O") {
      const players = jsonClone(this.state.players);
      players[winner].wins += 1;
      this.setState({
        players: players,
      });
    }

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      hasEnded: winner ? true : false,
    });
  }

  renderScoreBoard() {
    let xPlayerScoreClass = "player-score";
    let yPlayerScoreClass = "player-score";
    if (this.state.xIsNext) xPlayerScoreClass += " is-active";
    else yPlayerScoreClass += " is-active";

    return (
      <div className="score-board">
        <div className={xPlayerScoreClass}>
          <span className="player-score__name">{this.state.players["X"].name}</span>
          <span className="player-score__wins">{this.state.players["X"].wins === 0 ? "-" : this.state.players["X"].wins}</span>
        </div>
        <div className={yPlayerScoreClass}>
          <span className="player-score__wins">{this.state.players["O"].wins === 0 ? "-" : this.state.players["O"].wins}</span>
          <span className="player-score__name">{this.state.players["O"].name}</span>
        </div>
      </div>
    );
  }

  renderGame() {
    let status = "";
    const winner = calculateWinner(this.state.squares.slice());

    if (winner) status = winner === "T" ? `Tie` : `${this.state.players[winner].name} Won`;
    else if (!this.state.xIsNext && this.state.mode === "single")
      setTimeout(() => {
        this.handleSquareClick(this.state.botAlgorithm(this.state.squares));
      }, 300);

    return (
      <div className="game-container">
        {this.renderScoreBoard()}
        <Board squares={this.state.squares} hasEnded={this.state.hasEnded} onClick={(i) => this.handleSquareClick(i)} message={status} />
        <button
          className="btn btn_home"
          onClick={() => {
            this.resetGame();
          }}
        >
          Home
        </button>
      </div>
    );
  }

  render() {
    if (this.state.currentPage === "home") return this.renderHome();
    if (this.state.currentPage === "names") return this.renderInputNames();
    if (this.state.currentPage === "playing") return this.renderGame();
  }
}

export default Game