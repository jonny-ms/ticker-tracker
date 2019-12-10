import * as React from "react";

export function AddStock() {
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		open ? setOpen(false) : setOpen(true);
	};

	return (
		<>
			<button onClick={handleClick}>+</button>
			<div className="popup">
				<p>Add to Watchlist</p>
				<p>Add to Holdings</p>
			</div>
		</>
	);
}
