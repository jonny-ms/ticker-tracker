import * as React from "react";
import { LiveSearch } from "./search/LiveSearch";
import { Portfolio } from "./portfolio/Portfolio";
import { Watchlist } from "./watchlist/Watchlist";

export function Home() {
	return (
		<>
			<LiveSearch />
			<div className="list">
				<Portfolio />
				<Watchlist />
			</div>
		</>
	);
}
