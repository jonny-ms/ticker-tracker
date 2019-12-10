import * as React from "react";
// import axios from "axios";
import { QuoteHeader } from "./QuoteHeader";
import { Loading } from "../Loading";
import { Chart } from "./Chart";
import { Scope } from "./Scope";
import { quote, intraOneDay, intraOneWeek } from "../../db/mockApi";

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
		//   method: 'get',
		//   url: `https://api.worldtradingdata.com/api/v1/stock?symbol=${search.term}&api_token=${process.env.REACT_APP_WORLD_TRADING_API_KEY}`,
		// })
		// .then(({data}) => {

		//   setSearch(search => ({
		//     ...search,
		//     realTimeQuote: data.data[0],
		//     loading: false
		//   }));

		// })

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
		if (search.chartData[scope.name]) return;
		console.log("in scoped data request", scope);

		//!Commented out axios call
		// if (['1D', '1W'].includes(scope.name)) {

		//*Intraday Data for 1D, and 1W

		//   axios({
		//     method: 'get',
		//     url: `https://intraday.worldtradingdata.com/api/v1/intraday?symbol=${search.term}&range=${scope.apiRange}&interval=${scope.apiInterval}&api_token=${process.env.REACT_APP_WORLD_TRADING_API_KEY}`,
		//   })
		//   .then(({data}) => {

		//     console.log('intraday resp', data.intraday)

		//     const updatedChartData = {
		//       ...search.chartData,
		//       [scope.name]: data.intraday
		//     }

		//     setSearch(search => ({
		//       ...search,
		//       chartData: updatedChartData
		//     }))

		//   })

		//  } else {

		//*Historical Data for 1M, 3M, 1Y, and 3Y scopes

		//   const date = moment().subtract(scope.count, scope.unit).format('YYYY-MM-DD')

		//   axios({
		//     method: 'get',
		//     url: `https://api.worldtradingdata.com/api/v1/history?symbol=${search.term}&date_from=${date}&api_token=${process.env.REACT_APP_WORLD_TRADING_API_KEY}`,
		//   })
		//   .then(({data}) => {

		//     console.log('history resp', data.history)

		//     const updatedChartData = {
		//       ...search.chartData,
		//       [scope.name]: data.history
		//     }

		//     setSearch(search => ({
		//       ...search,
		//       chartData: updatedChartData
		//     }))

		//   })

		//  }

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

	return (
		<>
			<Loading show={search.loading} />
			{search.realTimeQuote.name && (
				<QuoteHeader quote={search.realTimeQuote} />
			)}
			{search.chartData[scope.name] && (
				<>
					<Chart data={search.chartData[scope.name]} />
					<Scope onChange={scope => setScope(scope)} />
				</>
			)}
		</>
	);
}
