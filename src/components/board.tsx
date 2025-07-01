import Square from "./square";

interface Props {
	squares: string[];
	xIsNext: boolean;
	onPlay: (squares: string[]) => void;
}


export default function Board({squares, xIsNext, onPlay}:Props) {
	const onClick = (index: number) => {
		if (squares[index] !== "" || calculateWinner(squares))
			return;

		const symbol = (xIsNext) ? "X" : "O";

		const nextSquares = squares.slice();
		nextSquares[index] = symbol;

		onPlay(nextSquares);
	};

	const items = squares.map((square, index) => {
		return (<Square key={index} symbol={square} onClick={() => onClick(index)}/>)
	})

	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = "Winner: " + winner;
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

function calculateWinner(squares: string[]) {
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
			return squares[a];
		}
	}
	return null;
}
