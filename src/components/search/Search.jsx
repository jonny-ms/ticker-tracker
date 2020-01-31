import * as React from "react";
import { LiveSearch } from "./LiveSearch";

export function Search() {
	return (
		<>
			<nav>
				<img src="/images/search.svg" alt="search-icon" />
				<LiveSearch />
				<h3>Cancel</h3>
			</nav>
		</>
	);
}
