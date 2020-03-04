import * as React from "react";
import { Portfolio } from "./portfolio/Portfolio";
import { Watchlist } from "./watchlist/Watchlist";
import { NavBar } from "./NavBar";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";
import axios from "axios";

export function Home() {
	const [portfolio, setPortfolio] = React.useState([]);
	const [watchlistItems, setWatchlist] = React.useState([]);
	const [realTimeQuotes, setRealTimeQuotes] = React.useState([]);

	// TODO: Check for JWT. Render Portfolio + Watchlist if found and not expired, else render login/register buttons

	React.useEffect(() => {
		const token = Cookie.get("tickr-token") ? Cookie.get("tickr-token") : null;

		if (token) {
			axios
				.all([
					axios({
						method: "GET",
						url: "/api/portfolio",
						headers: { Authorization: `Bearer ${token}` }
					}),
					axios({
						method: "GET",
						url: "/api/watchlist",
						headers: { Authorization: `Bearer ${token}` }
					})
				])
				.then(
					axios.spread((portfolio, watchlist) => {
						console.log("portfolio from db", portfolio.data);
						console.log("watchlist from db", watchlist.data);
						setPortfolio(portfolio.data);
						setWatchlist(watchlist.data);

						axios({
							method: "GET",
							url: "/api/stocks",
							params: {
								tickers: watchlist.data.join()
							}
						}).then(({ data }) => {
							console.log(
								"real-time quotes for stocks in watchlist and portfolio",
								data.data
							);
							setRealTimeQuotes(data.data);
						});
					})
				);
		}
	}, []);

	return (
		<>
			<NavBar />
			<div className="list">
				<Portfolio portfolio={portfolio} realTimeQuotes={realTimeQuotes} />
				<Watchlist
					watchlistItems={watchlistItems}
					realTimeQuotes={realTimeQuotes}
				/>
				<Link to="/login" className="homepage-prompt">
					<div className="homepage-prompt-box">
						<div>
							<h3>I have a Tickr login</h3>
							<h6>Welcome back!</h6>
						</div>
						<img src="/images/forward-arrow.svg" alt="forward-arrow.svg" />
					</div>
				</Link>
				<Link to="/registration" className="homepage-prompt">
					<div className="homepage-prompt-box">
						<div>
							<h3>Sign up for Tickr</h3>
							<h6>Sign up to start creating a watchlist and a portfolio.</h6>
						</div>
						<img src="/images/forward-arrow.svg" alt="forward-arrow.svg" />
					</div>
				</Link>
			</div>
		</>
	);
}
