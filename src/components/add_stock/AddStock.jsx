import * as React from "react";
import Popup from "reactjs-popup";
import { NewHoldingForm } from "./NewHoldingForm";

export function AddStock({ data }) {
	const addToWatchlist = () => {
		// TODO POST to watchlist
		console.log(`Added ${data.symbol} to watchlist`);
	};

	return (
		<Popup
			trigger={<img src="/images/add.svg" alt="add-stock-button" />}
			position="bottom center"
			on="hover"
		>
			<div className="popup">
				<div onClick={addToWatchlist}>Add to Watchlist</div>
				<Popup trigger={<div>Add to Holdings</div>} modal closeOnDocumentClick>
					<NewHoldingForm data={data} />
				</Popup>
			</div>
		</Popup>
	);
}
