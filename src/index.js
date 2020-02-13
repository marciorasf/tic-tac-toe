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

const squaresDefault = () => Array(9).fill(undefined);

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
  constructor(props) {
    super(props);

    this.state = {
      players: {
        X: { name: "Player 1", wins: 0 },
        O: { name: "Player 2", wins: 0 },
      },
      squares: squaresDefault(),
      xIsNext: true,
      isPlaying: false,
      hasEnded: false,
      nGames: 0,
    };
  }

  handleNamesSubmit(event) {
    event.persist();
    event.preventDefault();

    const players = this.state.players;
    players["X"].name = event.target.elements["inputPlayerX"].value;
    players["O"].name = event.target.elements["inputPlayerO"].value;

    this.setState({
      players: players,
      squares: squaresDefault(),
      isPlaying: true,
      xIsNext: true,
    });
  }

  handleSquareClick(index) {
    const squares = this.state.squares;
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
      const players = this.state.players;
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

  restartGame() {
    this.setState({
      squares: squaresDefault(),
      xIsNext: this.state.nGames % 2 === 0,
      hasEnded: false,
    });
  }

  resetGame() {
    const players = this.state.players;
    players["X"].wins = 0;
    players["O"].wins = 0;
    this.setState({
      isPlaying: false,
      players: players,
    });

    this.restartGame();
  }

  renderPreGame() {
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
    const winner = calculateWinner(this.state.squares);

    if (winner) status = winner === "T" ? `Tie` : `${this.state.players[winner].name} Won`;

    return (
      <div className="game-container">
        {this.renderScoreBoard()}
        <Board squares={this.state.squares} hasEnded={this.state.hasEnded} onClick={(i) => this.handleSquareClick(i)} message={status} />
        <button
          className="btn btn_change-players"
          onClick={() => {
            this.resetGame();
          }}
        >
          Change players
        </button>
      </div>
    );
  }

  render() {
    return this.state.isPlaying ? this.renderGame() : this.renderPreGame();
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
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
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

function PlayerInput(props) {
  const inputId = `inputPlayer${props.playerId}`;
  return (
    <div className="player-input">
      <label htmlFor={inputId}>{icons[props.playerId]}:</label>
      <input id={inputId} name={inputId} type="text" defaultValue={props.playerName} />
    </div>
  );
}
