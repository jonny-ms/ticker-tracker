import * as React from "react";

export function QuoteHeader(props) {
	const valueDiff =
		Math.round((props.quote.price - props.dynamicValue) * 100) / 100;
	const valueChange =
		Math.round((props.dynamicValue / props.quote.price - 1) * 10000) / 100;

	return (
		<>
			<p>{props.quote.symbol}</p>
			<p>{props.quote.name}</p>
			<div>
				{props.dynamicValue ? (
					<span>{props.dynamicValue} </span>
				) : (
					<span>{props.quote.price} </span>
				)}
				<span>{props.quote.currency}</span>
			</div>
			<div>
				{props.dynamicValue ? (
					<>
						<span>{valueDiff}</span> <span>({valueChange}%)</span>
					</>
				) : (
					<span>
						{props.quote.day_change} ({props.quote.change_pct}%)
					</span>
				)}
			</div>
		</>
	);
}
