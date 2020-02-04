import * as React from "react";
import { SearchBar } from "./SearchBar";
// import axios from "axios";
import { autoComplete } from "../../db/mockApi";

export function LiveSearch({ handleSearch }) {
	const [term, setTerm] = React.useState("");

	const prev = React.useRef("");

	React.useEffect(() => {
		if (prev.current === "" && term === "") return;

		if (term === "") {
			handleSearch({
				results: [],
				loading: false
			});
			return;
		}

		handleSearch(prev => ({
			...prev,
			loading: true
		}));

		prev.current = term;

		//!Commented out axios call
		// axios({
		// 	method: "get",
		// 	url: `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/auto-complete?lang=en&region=US&query=${term}`,
		// 	responseType: "stream",
		// 	headers: {
		// 		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
		// 		"x-rapidapi-key": process.env.REACT_APP_YAHOO_FINANCE_API_KEY
		// 	}
		// }).then(({ data }) => {
		// 	console.log(data.ResultSet.Result);

		// 	handleSearch({
		// 		results: data.ResultSet.Result,
		// 		loading: false
		// 	});
		// });
		// .catch(error => {
		// console.log(error);
		// showError();
		// });

		//!Mock fetch

		const awaitFunc = () => {
			return new Promise(() => {
				setTimeout(() => {
					handleSearch({
						results: autoComplete,
						loading: false
					});
				}, 2000);
			});
		};

		async function asyncCall() {
			await awaitFunc();
		}
		asyncCall();
	}, [term]);

	return (
		<div className="live-search">
			<SearchBar onSearch={term => setTerm(term)} />
		</div>
	);
}
