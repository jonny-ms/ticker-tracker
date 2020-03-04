// TODO refactor conditional styling

import * as React from "react";
import { Link } from "react-router-dom";

export function Portfolio({ portfolio, realTimeQuotes }) {
	const [portfolioData, setPortfolioData] = React.useState([]);
	const [scope, setScope] = React.useState("Daily");
	const [marketValue, setMarketValue] = React.useState(null);
	const [portfolioCost, setPortfolioCost] = React.useState(null);
	const [portfolioDayChange, setPortfolioDayChange] = React.useState(null);
	const [portfolioPercentChange, setPortfolioPercentChange] = React.useState(
		null
	);

	React.useEffect(() => {
		if (realTimeQuotes.length === 0) return;

		const data = realTimeQuotes.map(stock => {
			let position = portfolio[stock.symbol];
			console.log(position);
			return (stock = {
				name: stock.name,
				current_price: Number(stock.price),
				day_change: Number(stock.day_change),
				change_pct: Number(stock.change_pct),
				currency: stock.currency,
				stock_exchange_short: stock.stock_exchange_short,
				...position
			});
		});
		console.log(data);
		setPortfolioData(data);

		setMarketValue(
			Math.round(
				data.reduce((a, b) => {
					return a + b.current_price * b.amount;
				}, 0) * 100
			) / 100
		);

		setPortfolioCost(
			Math.round(
				data.reduce((a, b) => {
					return a + b.price * b.amount;
				}, 0) * 100
			) / 100
		);

		setPortfolioDayChange(
			Math.round(
				data.reduce((a, b) => {
					return a + b.day_change * b.amount;
				}, 0) * 100
			) / 100
		);

		setPortfolioPercentChange(
			Math.round(
				data.reduce((a, b) => {
					return a + b.change_pct;
				}, 0) * 100
			) / 100
		);
	}, [realTimeQuotes]);
	console.log("portfolio", portfolioData);

	// let tabStyle = "tab";
	// scope === "Daily" ? (tabStyle += " daily") : (tabStyle += " open");

	return (
		<>
			{portfolioData[0] && (
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
						{portfolioData.map(position => {
							/* //! This article is a PortfolioItem */
							if (scope === "Daily") {
								return (
									<>
										<Link
											to={{
												pathname: `/position/${position.ticker}`,
												state: { position }
											}}
											key={position.id}
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
											key={position.id}
										>
											<article>
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
