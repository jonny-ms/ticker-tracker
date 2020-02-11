import * as React from "react";
// import axios from "axios";
import { QuoteHeader } from "./QuoteHeader";
import { Loading } from "../Loading";
import { Chart } from "./Chart";
import { Scope } from "./Scope";
import { quote, intraOneDay, intraOneWeek } from "../../db/mockApi";
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
			const show = currPos.y < -50;
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
		// axios({
		// 	method: "get",
		// 	url: `https://api.worldtradingdata.com/api/v1/stock?symbol=${search.term}&api_token=${process.env.REACT_APP_WORLD_TRADING_API_KEY}`
		// }).then(({ data }) => {
		// 	setSearch(search => ({
		// 		...search,
		// 		realTimeQuote: data.data[0],
		// 		loading: false
		// 	}));
		// });

		//!Mock fetch

		const awaitFunc = () => {
			return new Promise(() => {
				setTimeout(() => {
					setSearch(search => ({
						...search,
						realTimeQuote: quote,
						loading: false
					}));
				}, 2000);
			});
		};

		async function asyncCall() {
			await awaitFunc();
		}
		asyncCall();
	}, [search.term]);

	//!Scoped data for chart
	React.useEffect(() => {
		setDynamicValue(null);

		if (search.chartData[scope.name]) return;

		console.log("in scoped data request", scope, search.chartData);

		//!Commented out axios call
		// if (["1D", "1W"].includes(scope.name)) {
		// 	//*Intraday Data for 1D, and 1W

		// 	axios({
		// 		method: "get",
		// 		url: `https://intraday.worldtradingdata.com/api/v1/intraday?symbol=${search.term}&range=${scope.apiRange}&interval=${scope.apiInterval}&api_token=${process.env.REACT_APP_WORLD_TRADING_API_KEY}`
		// 	}).then(({ data }) => {
		// 		console.log("intraday resp", data.intraday);

		// 		const updatedChartData = {
		// 			...search.chartData,
		// 			[scope.name]: data.intraday
		// 		};

		// 		setSearch(search => ({
		// 			...search,
		// 			chartData: updatedChartData
		// 		}));
		// 	});
		// } else {
		// 	//*Historical Data for 1M, 3M, 1Y, and 3Y scopes

		// 	const date = moment()
		// 		.subtract(scope.count, scope.unit)
		// 		.format("YYYY-MM-DD");

		// 	axios({
		// 		method: "get",
		// 		url: `https://api.worldtradingdata.com/api/v1/history?symbol=${search.term}&date_from=${date}&api_token=${process.env.REACT_APP_WORLD_TRADING_API_KEY}`
		// 	}).then(({ data }) => {
		// 		console.log("history resp", data.history);

		// 		const updatedChartData = {
		// 			...search.chartData,
		// 			[scope.name]: data.history
		// 		};

		// 		setSearch(search => ({
		// 			...search,
		// 			chartData: updatedChartData
		// 		}));
		// 	});
		// }

		//!Mock fetch

		const data = scope.name === "1D" ? intraOneDay : intraOneWeek;

		const updatedChartData = {
			...search.chartData,
			[scope.name]: data
		};

		const awaitFunc = () => {
			return new Promise(() => {
				setTimeout(() => {
					setSearch(search => ({
						...search,
						chartData: updatedChartData,
						loading: false
					}));
				}, 2000);
			});
		};

		async function asyncCall() {
			await awaitFunc();
		}
		asyncCall();
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
