import * as React from "react";
import { LiveSearch } from "./LiveSearch";
import { Results } from "./Results";
import { Loading } from "../Loading";

export function Search() {
	const [search, setSearch] = React.useState({
		results: [],
		loading: false
	});

	const handleSearch = param => {
		setSearch(param);
	};

	return (
		<>
			<nav className="search">
				<img src="/images/search.svg" alt="search-icon" />
				<LiveSearch handleSearch={handleSearch} />
			</nav>
			<section className="list">
				<Loading show={search.loading} />
				<Results results={search.results} />
			</section>
		</>
	);
}
