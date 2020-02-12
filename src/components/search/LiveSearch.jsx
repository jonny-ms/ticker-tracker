import * as React from "react";
import api from "../../api";

import { SearchBar } from "./SearchBar";
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

		handleSearch(() => ({
			results: [],
			loading: true
		}));

		prev.current = term;

		//!Commented out axios call
		// api.yahooFinanceApi.getAutocomplete(term)
		// .then(({ data }) => {
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
