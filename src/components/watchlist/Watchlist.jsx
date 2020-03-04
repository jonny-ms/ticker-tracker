import * as React from "react";
import { Link } from "react-router-dom";

export function Watchlist({ watchlistItems, realTimeQuotes }) {
	let watchlistData = [];

	if (realTimeQuotes[0]) {
		watchlistData = realTimeQuotes.filter(stock => {
			return watchlistItems.includes(stock.symbol);
		});
	}

	return (
		<>
			{watchlistItems[0] && (
				<section className="portfolio">
					<h2>Watchlist</h2>
					<hr />
					<main>
						{watchlistData.map(stock => {
							return (
								<>
									<Link to={`/stocks/${stock.symbol}`} key={stock.symbol}>
										<article>
											<div>
												<h4>{stock.name}</h4>
												<h4>{stock.price}</h4>
											</div>
											<div>
												<h5>
													{stock.last_trade_time} | {stock.stock_exchange_short}
												</h5>
												{stock.day_change > 0 && (
													<h5 className="profit">
														{stock.day_change} ({stock.change_pct}%)
													</h5>
												)}
												{stock.day_change < 0 && (
													<h5 className="loss">
														{stock.day_change} ({stock.change_pct}%)
													</h5>
												)}
												{stock.day_change === 0 && (
													<h5 className="break-even">
														{stock.day_change} ({stock.change_pct}%)
													</h5>
												)}
											</div>
										</article>
									</Link>
									<hr />
								</>
							);
						})}
					</main>
				</section>
			)}
		</>
	);
}
