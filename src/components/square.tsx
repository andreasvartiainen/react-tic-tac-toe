interface Props {
	symbol: string;
	onClick: () => void;
}

export default function Square({symbol, onClick}:Props) {
	return (
		<button 
			className="square"
			onClick={onClick}>
		{symbol}
		</button>
	)
}
