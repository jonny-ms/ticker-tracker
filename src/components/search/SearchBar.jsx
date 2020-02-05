import * as React from "react";
import useDebounce from "../../hooks/useDebounce";
import { Link } from "react-router-dom";

export function SearchBar(props) {
	const [value, setValue] = React.useState("");

	useDebounce(() => props.onSearch(value), 1000);

	const cancelSearch = () => {
		setValue("");
		props.onSearch("");
	};

	return (
		<>
			<div className="search-bar">
				<form onSubmit={e => e.preventDefault()}>
					<input
						value={value}
						onChange={event => setValue(event.target.value)}
						placeholder="Search name or symbol"
						alt="Search stocks by name or symbol"
						type="text"
					/>
					{value && (
						<img
							src="/images/dismiss-cross.svg"
							alt="undo-search"
							onClick={cancelSearch}
							className="undo-search-button"
						/>
					)}
				</form>
			</div>
			<Link to="/">
				<p>Cancel</p>
			</Link>
		</>
	);
}
