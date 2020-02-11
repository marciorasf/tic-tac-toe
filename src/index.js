import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./css/index.css";
import "./css/reset.css";

function PlayerInput(props) {
	const inputId = `inputPlayer${props.playerId}`;
	return (
		<div className="player-input">
			<label htmlFor={inputId}>{icons[props.playerId]}:</label>
			<input id={inputId} name={inputId} type="text" defaultValue={props.playerName} />
		</div>
	);
}

const icons = {
	X: <FontAwesomeIcon icon={faTimes} />,
	O: "O"
};

const squaresDefault = () => Array(9).fill(undefined);

class Board extends React.Component {
	createSquares(squares, onClick) {
		let htmlSquares = [];
		for (let i = 0; i < 9; i++) {
			htmlSquares.push(
				<button key={i} className="square" onClick={() => onClick(i)}>
					{icons[squares[i]]}
				</button>
			);
		}
		return htmlSquares;
	}

	render() {
		let className = "board " + (this.props.isEnded ? "is-inactive" : "is-active");
		return <div className={className}>{this.createSquares(this.props.squares, this.props.onClick)}</div>;
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			players: {
				X: { name: "Player 1" },
				O: { name: "Player 2" }
			},
			isPlaying: false,
			squares: squaresDefault(),
			xIsNext: true,
			isEnded: false
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
			xIsNext: true
		});
	}

	handleSquareClick(index) {
		const squares = this.state.squares;
		if (this.state.isEnded) {
			this.resetGame();
			return;
		}
		if (squares[index]) return;

		squares[index] = this.state.xIsNext ? "X" : "O";
		this.setState({
			squares: squares,
			xIsNext: !this.state.xIsNext,
			isEnded: calculateWinner(squares) ? true : false
		});
	}

	resetGame() {
		this.setState({
			squares: squaresDefault(),
			xIsNext: true,
			isEnded: false
		});
	}

	renderPreGame() {
		return (
			<form className="game-container" onSubmit={evt => this.handleNamesSubmit(evt)}>
				<PlayerInput playerId={"X"} playerName={this.state.players["X"].name} />
				<PlayerInput playerId={"O"} playerName={this.state.players["O"].name} />
				<button className="btn btn--play" type="submit">
					Play
				</button>
			</form>
		);
	}

	renderGame() {
		let status;
		const winner = calculateWinner(this.state.squares);

		if (winner) status = winner === "T" ? `Tie` : `${this.state.players[winner].name} Won`;
		else status = "Turn: " + (this.state.xIsNext ? this.state.players["X"].name : this.state.players["O"].name);

		return (
			<div className="game-container">
				<span className="status">{status}</span>
				<Board squares={this.state.squares} isEnded={this.state.isEnded} onClick={i => this.handleSquareClick(i)} />
				<button className="btn btn--change-players" onClick={() => this.setState({ isPlaying: false, isEnded: false })}>
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
					<span className="title">tic tac toe</span>
					<span className="subtitle">@marciorasf</span>
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
		[2, 4, 6]
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}

	const checkedSquares = squares.filter(i => i === undefined);
	if (checkedSquares.length === 0) return "T";

	return null;
}
