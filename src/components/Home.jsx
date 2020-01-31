import * as React from "react";
import { LiveSearch } from "./search/LiveSearch";
import { Portfolio } from "./portfolio/Portfolio";
import { Watchlist } from "./watchlist/Watchlist";

export function Home() {
	return (
		<>
			<nav>
				<img src="/images/user.svg" alt="user-profile" />
				<h1>Tickr</h1>
				<img src="/images/search-orange.svg" alt="search-stocks" />
			</nav>
			<LiveSearch />
			<div className="list">
				<Portfolio />
				<Watchlist />
			</div>
		</>
	);
}
