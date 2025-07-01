import { useState } from "react";
import Board from "./board";

export default function Game() {
	const [history, setHistory] = useState<string[][]>([Array(9).fill("")])
	const [currentMove, setCurrentMove] = useState<number>(0);
	const [isSort, setIsSort] = useState<boolean>(false);
	const currentSquares = history[currentMove];
	const xIsNext = currentMove % 2 === 0;

	const handlePlay = (nextSquares: string[]) => {
		const nextHistory = [...history.slice(0, currentMove +1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	const jumpTo = (nextMove: number) => {
		setCurrentMove(nextMove);
	}

	const toggleSort = () => {
		setIsSort(!isSort);
	}

	const moves = history.map((_, move) => {
		let description;
		if (move === currentMove) {
			return (
				<li key={move}>
				{`you are at move #${move}`}
				</li>
			)
		}
		if (move > 0) {
			description = `Go to move #${move}`;
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
				<Board xIsNext={xIsNext} squares={currentSquares} isGameOver={currentMove == 9} onPlay={(s) => handlePlay(s)}/>
			<div className="game-info">
				<button onClick={toggleSort}>Toggle Sort</button>
				<ol>{moves}</ol>
			</div>
			</div>
		</div>
		</>
	)
}
