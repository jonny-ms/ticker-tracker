import * as React from "react";
import api from "../../api";
import { QuoteHeader } from "./QuoteHeader";
import { Loading } from "../Loading";
import { Chart } from "./Chart";
import { Scope } from "./Scope";
import mockApi from "../../db/mockApi";
import { AddStock } from "../add_stock/AddStock";
import moment from "moment";
import { Link } from "react-router-dom";
import { Stats } from "./Stats";
import { NewsFeed } from "./NewsFeed";
import { useScrollPosition } from "../../hooks/useScrollPosition";

export function Quote({ match }) {
	const [search, setSearch] = React.useState({
		term: match.params.ticker,
		realTimeQuote: {},
		chartData: {},
		loading: false
	});

	const [scope, setScope] = React.useState({
		name: "1D",
		count: 1,
		unit: "days",
		apiInterval: 5,
		apiRange: 1
	});

	const [dynamicValue, setDynamicValue] = React.useState(null);

	const [isWatched, setIsWatched] = React.useState(false);
	const [showOnScroll, setShowOnScroll] = React.useState(false);

	useScrollPosition(
		({ prevPos, currPos }) => {
			const show = currPos.y < -70;
			if (show !== showOnScroll) setShowOnScroll(show);
		},
		[showOnScroll]
	);

	//!Real-time data for header (will include all initial data, ie. stats, news, etc.)
	React.useEffect(() => {
		console.log("in real-time data request", search.term);

		setSearch(prev => ({
			...prev,
			loading: true
		}));

		//!Commented out axios call
		//*Real time quote with summary
		process.env.REACT_APP_STAGE === "dev"
			? api.worldTradingApi.getRealTimeQuote(search.term).then(({ data }) => {
					console.log(data);
					setSearch(search => ({
						...search,
						realTimeQuote: data.quote[0],
						loading: false
					}));
			  })
			: //!Mock fetch
			  setTimeout(() => {
					setSearch(search => ({
						...search,
						realTimeQuote: mockApi.GOOG,
						loading: false
					}));
			  }, 1000);
	}, [search.term]);

	//!Scoped data for chart
	React.useEffect(() => {
		setDynamicValue(null);

		if (search.chartData[scope.name]) return;

		console.log("in scoped data request", scope, search.chartData);

		if (["1D", "1W"].includes(scope.name)) {
			//*Intraday Data for 1D, and 1W

			process.env.REACT_APP_STAGE === "dev"
				? api.worldTradingApi
						.getIntradayData(search.term, scope.apiRange, scope.apiInterval)
						.then(({ data }) => {
							console.log("intraday resp", data.intraday);

							const updatedChartData = {
								...search.chartData,
								[scope.name]: data.intraday
							};

							setSearch(search => ({
								...search,
								chartData: updatedChartData
							}));
						})
				: //!Mock fetch
				  setTimeout(() => {
						setSearch(search => ({
							...search,
							chartData: {
								...search.chartData,
								[scope.name]: mockApi.intraOneDay
							},
							loading: false
						}));
				  }, 1000);
		} else {
			//*Historical Data for 1M, 3M, 1Y, and 3Y scopes

			const date = moment()
				.subtract(scope.count, scope.unit)
				.format("YYYY-MM-DD");

			process.env.REACT_APP_STAGE === "dev"
				? api.worldTradingApi
						.getHistoricalData(search.term, date)
						.then(({ data }) => {
							console.log("history resp", data.history);

							const updatedChartData = {
								...search.chartData,
								[scope.name]: data.history
							};

							setSearch(search => ({
								...search,
								chartData: updatedChartData
							}));
						})
				: //!Mock fetch
				  setTimeout(() => {
						setSearch(search => ({
							...search,
							chartData: mockApi.intraOneWeek,
							loading: false
						}));
				  }, 1000);
		}
	}, [scope]);

	let watchLogoSrc = "/images/watch.svg";
	let watchLogoAlt = "add-to-watchlist-button";
	if (isWatched) {
		watchLogoSrc = "/images/watched.svg";
		watchLogoAlt = "remove-to-watchlist-button";
	}

	return (
		<>
			<nav className="nav-quote">
				{/* //Todo: onCLick make backend post, state of isWatched should default to true if stock is watched, banner should let user know it has been added to backend */}

				<img
					src={watchLogoSrc}
					alt={watchLogoAlt}
					onClick={() => {
						setIsWatched(!isWatched);
					}}
				/>
				{showOnScroll && (
					<p>
						<span>{search.realTimeQuote.symbol} </span>
						<span>{search.realTimeQuote.price} </span>
						<span>{search.realTimeQuote.currency}</span>
					</p>
				)}
				{/* //Todo: onCLick goBack() */}
				<img src="/images/close-cross.svg" alt="back-button" />
			</nav>
			<Loading show={search.loading} />
			{search.realTimeQuote.name && (
				<>
					<AddStock data={search.realTimeQuote} />
					<QuoteHeader
						quote={search.realTimeQuote}
						dynamicValue={dynamicValue}
					/>
				</>
			)}
			{search.chartData[scope.name] && (
				<>
					<Chart
						data={{ [scope.name]: search.chartData[scope.name] }}
						onChange={value => setDynamicValue(value)}
						marketOpen={search.realTimeQuote.price_open}
					/>
					<div className="list">
						<Scope onChange={scope => setScope(scope)} />
						<Stats summary={search.realTimeQuote} />
						<NewsFeed companyName={search.realTimeQuote.name} />
					</div>
				</>
			)}
		</>
	);
}
