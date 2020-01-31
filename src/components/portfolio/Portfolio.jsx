import * as React from "react";
import axios from "axios";
import { mockPortfolio, mockPortfolioData } from "../../db/mockApi";
import moment from "moment";
import { Link } from "react-router-dom";

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
		// const searchTerm = portfolioDb
		// .map(position => {
		// return position.ticker;
		// })
		// .join();
		// axios({
		// method: "get",
		// url: `https://api.worldtradingdata.com/api/v1/stock?symbol=${searchTerm}&api_token=${process.env.REACT_APP_WORLD_TRADING_API_KEY}`
		// }).then(({ data }) => {
		// console.log(data.data);

		for (let i in portfolioDb) {
			// const result = data.data[i];
			const result = mockPortfolioData[i];
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
		// });
	}, [portfolioDb]);

	// let tabStyle = "tab";
	// scope === "Daily" ? (tabStyle += " daily") : (tabStyle += " open");

	return (
		<>
			{portfolioDb[0] && portfolioDb[0].current_price && (
				<section className="portfolio">
					<h2>Portfolio</h2>
					<hr />
					{/* <p>Last Updated at: {moment().format("LLLL")}</p> */}
					<header>
						<div>
							<h3>Market Value</h3>
							<h3>{marketValue}</h3>
						</div>
						<div>
							<h4>Daily (P/L)</h4>
							{portfolioDayChange > 0 && (
								<h4 className="profit">
									{portfolioDayChange} ({portfolioPercentChange}%)
								</h4>
							)}
							{portfolioDayChange < 0 && (
								<h4 className="loss">
									{portfolioDayChange} ({portfolioPercentChange}%)
								</h4>
							)}
							{portfolioDayChange === 0 && (
								<h4 className="break-even">
									{portfolioDayChange} ({portfolioPercentChange}%)
								</h4>
							)}
						</div>
						<div>
							<h4>Open (P/L)</h4>
							{marketValue - portfolioCost > 0 && (
								<h4 className="profit">
									{Math.round((marketValue - portfolioCost) * 100) / 100} (
									{Math.round((marketValue / portfolioCost - 1) * 10000) / 100}
									%)
								</h4>
							)}
							{marketValue - portfolioCost < 0 && (
								<h4 className="loss">
									{Math.round((marketValue - portfolioCost) * 100) / 100} (
									{Math.round((marketValue / portfolioCost - 1) * 10000) / 100}
									%)
								</h4>
							)}
							{marketValue - portfolioCost === 0 && (
								<h4 className="break-even">
									{Math.round((marketValue - portfolioCost) * 100) / 100} (
									{Math.round((marketValue / portfolioCost - 1) * 10000) / 100}
									%)
								</h4>
							)}
						</div>
					</header>
					{/* //! Toggle between different views. Open positions. Closed positions. What views/info do I want to see? Probably not a select tag if only two views*/}
					<div>
						<select onChange={() => console.log("change")}>
							<option value="Open">Open Positions</option>
							<option value="Closed">Closed Positions</option>
						</select>

						{/* //! Tab to set scope*/}
						<div>
							<button
								onClick={() => setScope("Daily")}
								// className={tabStyle}
								autoFocus
							>
								Daily
							</button>
							<button
								onClick={() => setScope("Open")}
								// className={tabStyle}
							>
								Open
							</button>
						</div>
					</div>

					{/* //! This section is the PortfolioList */}
					<main>
						{portfolioDb.map(position => {
							/* //! This article is a PortfolioItem */
							if (scope === "Daily") {
								return (
									<>
										<Link
											to={{
												pathname: `/position/${position.ticker}`,
												state: { position }
											}}
											key={position.ticker}
										>
											<article>
												<div>
													<h4>{position.name}</h4>
													{position.day_change > 0 && (
														<h4 className="profit">
															{position.day_change} {position.currency}
														</h4>
													)}
													{position.day_change < 0 && (
														<h4 className="loss">
															{position.day_change} {position.currency}
														</h4>
													)}
													{position.day_change === 0 && (
														<h4 className="break-even">
															{position.day_change} {position.currency}
														</h4>
													)}
												</div>
												<div>
													<h5>
														{position.stock_exchange_short} | {position.ticker}
													</h5>
													{position.change_pct > 0 && (
														<h5 className="profit"> {position.change_pct}% </h5>
													)}
													{position.change_pct < 0 && (
														<h5 className="loss"> {position.change_pct}% </h5>
													)}
													{position.change_pct === 0 && (
														<h5 className="break-even">
															{position.change_pct}%
														</h5>
													)}
												</div>
												<h5>
													BUY {position.amount} @ {position.price}
												</h5>
											</article>
										</Link>
										<hr />
									</>
								);
							} else {
								return (
									<>
										<Link
											to={{
												pathname: `/position/${position.ticker}`,
												state: { position }
											}}
											key={position.ticker}
										>
											<article key={position.ticker}>
												<div>
													<h4>{position.name}</h4>
													{position.current_price - position.price > 0 && (
														<h4 className="profit">
															{Math.round(
																position.current_price - position.price
															) * position.amount}{" "}
															{position.currency}
														</h4>
													)}
													{position.current_price - position.price < 0 && (
														<h4 className="loss">
															{Math.round(
																position.current_price - position.price
															) * position.amount}{" "}
															{position.currency}
														</h4>
													)}
													{position.current_price - position.price === 0 && (
														<h4 className="break-even">
															{Math.round(
																position.current_price - position.price
															) * position.amount}{" "}
															{position.currency}
														</h4>
													)}
												</div>
												<div>
													<h5>
														{position.stock_exchange_short} | {position.ticker}
													</h5>
													{position.current_price / position.price - 1 > 0 && (
														<h5 className="profit">
															{Math.round(
																(position.current_price / position.price - 1) *
																	10000
															) / 100}
															%
														</h5>
													)}
													{position.current_price / position.price - 1 < 0 && (
														<h5 className="loss">
															{Math.round(
																(position.current_price / position.price - 1) *
																	10000
															) / 100}
															%
														</h5>
													)}
													{position.current_price / position.price - 1 ===
														0 && (
														<h5 className="break-even">
															{Math.round(
																(position.current_price / position.price - 1) *
																	10000
															) / 100}
															%
														</h5>
													)}
												</div>
												<h5>
													BUY {position.amount} @ {position.price}
												</h5>
											</article>
										</Link>
										<hr />
									</>
								);
							}
						})}
					</main>
				</section>
			)}
		</>
	);
}
