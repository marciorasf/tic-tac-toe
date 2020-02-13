import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./css/index.min.css";
import "./css/reset.min.css";

const icons = {
  X: <FontAwesomeIcon icon={faTimes} />,
  O: "O",
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

function PlayerInput(props) {
  const inputId = `inputPlayer${props.playerId}`;
  return (
    <div className="player-input">
      <label htmlFor={inputId}>{icons[props.playerId]}:</label>
      <input id={inputId} name={inputId} type="text" defaultValue={props.playerName} />
    </div>
  );
}

class Board extends React.Component {
  createSquares(squares, onClick) {
    let htmlSquares = [];
    for (let i = 0; i < 9; i++) {
      htmlSquares.push(
        <button key={i} className="square" onClick={() => onClick(i)}>
          {icons[squares[i]]}
        </button>,
      );
    }
    return htmlSquares;
  }

  render() {
    const className = "board " + (this.props.hasEnded ? "is-inactive" : "is-active");
    const onClick = this.props.hasEnded ? this.props.onClick : () => null;
    return (
      <div onClick={() => onClick(1)} className={className} data-message={this.props.message}>
        {this.createSquares(this.props.squares, this.props.onClick)}
      </div>
    );
  }
}

class Game extends React.Component {
  // modes: "single", "multi"

  constructor(props) {
    super(props);

    this.state = {
      mode: undefined,
      botAlgorithm: null,
      players: {
        X: { name: "Player 1", wins: 0 },
        O: { name: "Player 2", wins: 0 },
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
      botAlgorithm: botMediumAlgorithm,
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

    this.setState({
      players: players,
      squares: squaresDefault.slice(),
      currentPage: "playing",
      xIsNext: true,
    });
  }

  renderNamesPage() {
    return (
      <form className="game-container" onSubmit={(evt) => this.handleNamesSubmit(evt)}>
        <PlayerInput playerId={"X"} playerName={this.state.players["X"].name} />
        <PlayerInput playerId={"O"} playerName={this.state.players["O"].name} />
        <button className="btn btn_play" type="submit">
          Play
        </button>
      </form>
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
    if (this.state.currentPage === "names") return this.renderNamesPage();
    if (this.state.currentPage === "playing") return this.renderGame();
  }
}

class Layout extends React.Component {
  render() {
    return (
      <div className="content-container">
        <div className="header">
          <span className="header__title">tic tac toe</span>
          <span className="header__subtitle">@marciorasf</span>
        </div>
        <Game />
      </div>
    );
  }
}

ReactDOM.render(<Layout />, document.getElementById("root"));

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

function botEasyAlgorithm(squares) {
  let freeSquares = getFreeSquares(squares);
  return freeSquares[randomInt(0, freeSquares.length)];
}

function botMediumAlgorithm(squares) {
  let freeSquares = getFreeSquares(squares);

  let steps = [];
  for (let square of freeSquares) {
    let squaresCopy = squares.slice();
    squaresCopy[square] = "O";
    steps.push([square, ...getXWinPossibilites(squaresCopy)]);
  }
  steps.sort((arrA, arrB) => arrA.length - arrB.length);

  const minLength = steps[0].length;
  steps = steps.filter((arr) => arr.length === minLength);

  return steps[randomInt(0, steps.length)][0];
}

function botHardAlgorithm() {}

function getFreeSquares(squares) {
  let freeSquares = squares.map((value, index) => (!value ? index : false));
  return freeSquares.filter((value) => value !== false);
}

function getXWinPossibilites(squares) {
  let xWins = winPossibilites;
  xWins = xWins.map((line) => line.map((index) => squares[index]));
  xWins = xWins.filter((line) => !line.includes("O"));
  return xWins;
}

function jsonClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function randomInt(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min)) + min;
}
