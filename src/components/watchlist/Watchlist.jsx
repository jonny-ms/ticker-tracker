import * as React from "react";
import mockApi from "../../db/mockApi";
import axios from "axios";
import { Link } from "react-router-dom";

export function Watchlist() {
	const [watchlistDb, setWatchlistDb] = React.useState([]);
	const [watchlistData, setWatchlistData] = React.useState([]);

	React.useEffect(() => {
		setWatchlistDb(mockApi.mockWatchlistDb);
	}, []);

	React.useEffect(() => {
		if (!watchlistDb[0]) return;

		// axios({
		// 	method: "get",
		// 	url: `https://api.worldtradingdata.com/api/v1/stock?symbol=${watchlistDb.join()}&api_token=${
		// 		process.env.REACT_APP_WORLD_TRADING_API_KEY
		// 	}`
		// }).then(({ data }) => {
		// setWatchlistData(data.data);
		setWatchlistData(mockApi.mockWatchlistData);
		// });
	}, [watchlistDb]);

	return (
		<>
			{watchlistDb[0] && (
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
