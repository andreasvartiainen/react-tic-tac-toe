import { useState } from "react";
import Board from "./board";

interface History {
	history: string[][];
	position: number[];
}

export default function Game() {
	const [history, setHistory] = useState<History>({history: [Array(9).fill("")], position: []})
	const [currentMove, setCurrentMove] = useState<number>(0);
	const [isSort, setIsSort] = useState<boolean>(false);
	const currentSquares = history.history[currentMove];
	const xIsNext = currentMove % 2 === 0;

	const handlePlay = (nextSquares: string[], index: number) => {
		const nextHistory = {history: [...history.history.slice(0, currentMove +1), nextSquares], position: [...history.position.slice(0, currentMove +1), index]};
		setHistory(nextHistory);
		setCurrentMove(nextHistory.history.length - 1);
	}

	const jumpTo = (nextMove: number) => {
		setCurrentMove(nextMove);
	}

	const toggleSort = () => {
		setIsSort(!isSort);
	}

	const moves = history.history.map((_, move) => {
		let description;
		let columnRow: number = history.position[move - 1];
		columnRow = (columnRow === undefined) ? -1 : columnRow;
		const column = columnRow % 3;
		const row = Math.floor(columnRow / 3);
		if (move === currentMove) {
			return (
				<li key={move}>
				{`you are at move #${move} ${(columnRow === -1) ? "" : "at [" + row +"][" +column +"]"}`}
				</li>
			)
		}
		if (move > 0) {
			description = `Go to move #${move} ${(columnRow === -1) ? "" : "at [" + row +"][" +column +"]"}`
		} else {
			description = 'Go to game start';
		}
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{description}</button>
			</li>
		)
	})

	if (isSort) {
		moves.reverse();
	}

	return (
		<>
		<div className="game">
			<div className="game-board">
				<Board xIsNext={xIsNext} squares={currentSquares} isGameOver={currentMove == 9} onPlay={(s, index) => handlePlay(s, index)}/>
			<div className="game-info">
				<button onClick={toggleSort}>Toggle Sort</button>
				<ol>{moves}</ol>
			</div>
			</div>
		</div>
		</>
	)
}
