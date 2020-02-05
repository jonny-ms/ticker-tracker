import * as React from "react";
import { Portfolio } from "./portfolio/Portfolio";
import { Watchlist } from "./watchlist/Watchlist";
import { NavBar } from "./NavBar";

export function Home() {
	return (
		<>
			<NavBar />
			<div className="list">
				<Portfolio />
				<Watchlist />
			</div>
		</>
	);
}
