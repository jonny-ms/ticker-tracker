import * as React from "react";
import axios from "axios";
import { mockPortfolio } from "../../db/mockApi";

export function Portfolio() {
	const [portfolioDb, setPortfolioDb] = React.useState([]);
	const [scope, setScope] = React.useState("Daily");
	const [marketValue, setMarketValue] = React.useState(null);
	const [portfolioCost, setPortfolioCost] = React.useState(null);
	const [portfolioDayChange, setPortfolioDayChange] = React.useState(null);
	const [portfolioPercentChange, setPortfolioPercentChange] = React.useState(
		null
	);

	React.useEffect(() => {
		//! Backend call for user portfolio
		//Get all positions where id = user_id
		setPortfolioDb(mockPortfolio);
	}, []);

	React.useEffect(() => {
		if (portfolioDb.length === 0) return;

		//! Api call
		//Make API call for realtime data of all tickers belonging to user
		const searchTerm = portfolioDb
			.map(position => {
				return position.ticker;
			})
			.join();
		axios({
			method: "get",
			url: `https://api.worldtradingdata.com/api/v1/stock?symbol=${searchTerm}&api_token=${process.env.REACT_APP_WORLD_TRADING_API_KEY}`
		}).then(({ data }) => {
			console.log(data.data);

			for (let i in portfolioDb) {
				const result = data.data[i];
				portfolioDb[i] = {
					name: result.name,
					current_price: Number(result.price),
					day_change: Number(result.day_change),
					change_pct: Number(result.change_pct),
					currency: result.currency,
					stock_exchange_short: result.stock_exchange_short,
					...portfolioDb[i]
				};
			}

			setMarketValue(
				Math.round(
					portfolioDb.reduce((a, b) => {
						return a + b.current_price * b.amount;
					}, 0) * 100
				) / 100
			);

			setPortfolioCost(
				Math.round(
					portfolioDb.reduce((a, b) => {
						return a + b.price * b.amount;
					}, 0) * 100
				) / 100
			);

			setPortfolioDayChange(
				Math.round(
					portfolioDb.reduce((a, b) => {
						return a + b.day_change * b.amount;
					}, 0) * 100
				) / 100
			);

			setPortfolioPercentChange(
				Math.round(
					portfolioDb.reduce((a, b) => {
						return a + b.change_pct;
					}, 0) * 100
				) / 100
			);

			console.log("portfolioDb", portfolioDb);
		});
	}, [portfolioDb]);

	return (
		<>
			{portfolioDb[0] && (
				<>
					<p>Last Updated at: {"{...}"}</p>
					{portfolioDb[0].current_price && (
						<div>
							<span>Market Value --- </span>
							<span>{marketValue}</span>
						</div>
					)}
					<div>
						<span>Daily (P/L) --- </span>
						<span>
							{portfolioDayChange} {portfolioPercentChange} %
						</span>
					</div>
					<div>
						<span>Open (P/L) --- </span>
						<span>
							{Math.round((marketValue - portfolioCost) * 100) / 100}{" "}
							{Math.round((marketValue / portfolioCost - 1) * 10000) / 100} %
						</span>
					</div>
					{/* //! Toggle between different views. Open positions. Closed positions. What views/info do I want to see? Probably not a select tag if only two views*/}
					<div>
						<select>
							<option>Open</option>
							<option>Close</option>
						</select>
					</div>

					{/* //! Tab to set scope*/}
					<div>
						<button onClick={() => setScope("Daily")}>Daily</button>
						<button onClick={() => setScope("Open")}>Open</button>
					</div>

					{/* //! This section is the PortfolioList */}
					<section>
						{portfolioDb.map(position => {
							/* //! This article is a PortfolioItem */
							if (scope === "Daily") {
								return (
									<article key={position.ticker}>
										<div>
											<span>{position.name}</span>
											<span>
												{position.day_change}
												{position.currency}
											</span>
										</div>
										<div>
											<span>
												{position.stock_exchange_short} | {position.ticker}
											</span>
											<span> {position.change_pct} % </span>
										</div>
										<p>
											BUY {position.amount} @ {position.price}
										</p>
									</article>
								);
							} else {
								return (
									<article key={position.ticker}>
										<div>
											<span>{position.name}</span>
											<span>
												{Math.round(position.current_price - position.price) *
													position.amount}
												{position.currency}
											</span>
										</div>
										<div>
											<span>
												{position.stock_exchange_short} | {position.ticker}
											</span>
											<span>
												{Math.round(
													(position.current_price / position.price - 1) * 10000
												) / 100}
												%
											</span>
										</div>
										<p>
											BUY {position.amount} @ {position.price}
										</p>
									</article>
								);
							}
						})}
					</section>
				</>
			)}
		</>
	);
}
