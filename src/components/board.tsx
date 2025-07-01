import Square from "./square";

interface Props {
	squares: string[];
	xIsNext: boolean;
	isGameOver: boolean;
	onPlay: (squares: string[]) => void;
}

interface Winner {
	symbol: string;
	line: number[];
}

export default function Board({squares, xIsNext, isGameOver, onPlay}:Props) {
	const winner: Winner | null = calculateWinner(squares);

	const onClick = (index: number) => {
		if (squares[index] !== "" || winner) {
			return;
		}

		const symbol = (xIsNext) ? "X" : "O";

		const nextSquares = squares.slice();
		nextSquares[index] = symbol;

		onPlay(nextSquares);
	};

	const items = squares.map((square, index) => {
		if (winner?.line.find((value) => value === index) != null) {
			console.log(index);
			return (<Square key={index} symbol={square} active onClick={() => onClick(index)}/>)
		}
		return (<Square key={index} symbol={square} onClick={() => onClick(index)}/>)
	})

	let status;
	if (winner) {
		status = "Winner: " + winner.symbol;
	}else if (isGameOver) {
		status = "Draw";
	} else {
		status = "Next Player: " + (xIsNext ? "X" : "O");
	}

	return (
		<>
		<div className="status">{status}</div>
		<div className='gameGrid'>
		{items}
		</div>
		</>
	)
}

function calculateWinner(squares: string[]) : Winner | null {
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
	for (let i = 0; i <lines.length; i++) {
		const [a,b,c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return {symbol: squares[a], line: lines[i]};
		}
	}
	return null;
}
