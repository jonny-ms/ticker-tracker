import * as React from "react";
import axios from "axios";
import { mockPortfolio } from "../../db/mockApi";

export function Portfolio() {
	const [portfolioDb, setPortfolioDb] = React.useState([]);
	const [portfolioData, setPortfolioData] = React.useState([]);

	React.useEffect(() => {
		//! Backend call for user portfolio
		setPortfolioDb(mockPortfolio);

		//! Api call
		const searchTerm = mockPortfolio
			.map(position => {
				return position.ticker;
			})
			.join();
		axios({
			method: "get",
			url: `https://api.worldtradingdata.com/api/v1/stock?symbol=${searchTerm}&api_token=${process.env.REACT_APP_WORLD_TRADING_API_KEY}`
		}).then(({ data }) => {
			setPortfolioData(data.data);
		});
	}, []);

	return (
		<>
			<p>Last Updated at: {"{...}"}</p>
			<div>
				<span>Market Value --- </span>
				<span>
					{"{currency}"} {"{currentValue}"}
				</span>
			</div>
			<div>
				<span>Daily (P/L?) --- </span>
				<span>
					{"{valueChange}"} {"({percentChange})"}
				</span>
			</div>
			<div>
				<span>Open (P/L?) --- </span>
				<span>
					{"{valueChange}"} {"({percentChange})"}
				</span>
			</div>
			{/* //! Toggle between different views. Open positions. Closed positions. What views/info do I want to see? Probably not a select tag if only two views*/}
			<div>
				<select>
					<option>Open</option>
					<option>Close</option>
				</select>
			</div>
			{/* //! Tab */}
			<div>
				<button>Daily</button>
				<button>Open</button>
			</div>
			{/* //! This section is the PortfolioList */}
			<section>
				{portfolioDb.map(position => {
					/* //! This article is a PortfolioItem */
					return (
						<article>
							<div>
								<span>{position.name}</span>
								<span> valueChange</span>
							</div>
							<div>
								<span>
									{position.stock_exchange_short} | {position.symbol}
								</span>
								<span> percentChange</span>
							</div>
							<p>BUY 22 @ 47.24</p>
						</article>
					);
				})}
			</section>
		</>
	);
}
