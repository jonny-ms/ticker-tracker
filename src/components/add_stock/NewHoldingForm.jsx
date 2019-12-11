import * as React from "react";

export function NewHoldingForm({ data }) {
	// TODO Handle submit

	return (
		<form>
			<h5>{data.name}</h5>
			<p>
				{data.stock_exchange_short} | {data.symbol}
			</p>
			<input type="number" placeholder="Amount" required />
			<input type="number" value={data.price} required />
			<input type="date" required />
			<input type="submit" />
		</form>
	);
}
