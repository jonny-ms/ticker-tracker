import * as React from "react";

export function Scope(props) {
	const oneDay = {
		name: "1D",
		count: 1,
		unit: "days",
		apiInterval: 5,
		apiRange: 1
	};
	const oneWeek = {
		name: "1W",
		count: 1,
		unit: "weeks",
		apiInterval: 60,
		apiRange: 5
	};
	const oneMonth = {
		name: "1M",
		count: 1,
		unit: "months",
		apiInterval: null,
		apiRange: null
	};
	const threeMonths = {
		name: "3M",
		count: 3,
		unit: "months",
		apiInterval: null,
		apiRange: null
	};
	const oneYear = {
		name: "1Y",
		count: 1,
		unit: "years",
		apiInterval: null,
		apiRange: null
	};
	const fiveYears = {
		name: "5Y",
		count: 5,
		unit: "years",
		apiInterval: null,
		apiRange: null
	};

	return (
		<div className="scope">
			<button
				className="scope-button-is-active"
				value={"1D"}
				onClick={() => props.onChange(oneDay)}
			>
				1D
			</button>
			<button
				className="scope-button"
				value={"1W"}
				onClick={() => props.onChange(oneWeek)}
			>
				1W
			</button>
			<button value={"1M"} onClick={() => props.onChange(oneMonth)}>
				1M
			</button>
			<button value={"3M"} onClick={() => props.onChange(threeMonths)}>
				3M
			</button>
			<button value={"1Y"} onClick={() => props.onChange(oneYear)}>
				1Y
			</button>
			<button value={"5Y"} onClick={() => props.onChange(fiveYears)}>
				5Y
			</button>
		</div>
	);
}
