interface Props {
	symbol: string;
	active?: boolean;
	onClick: () => void;
}

export default function Square({symbol, active, onClick}:Props) {
	return (
		<button 
			className={active ? "square active" : "square"}
			onClick={onClick}>
		{symbol}
		</button>
	)
}
