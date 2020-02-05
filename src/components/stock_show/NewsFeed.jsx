import * as React from "react";
import axios from "axios";

export function NewsFeed({ companyName }) {
	const [news, setNews] = React.useState([]);

	const formatNameForSearch = string => {
		const regex = /inc\./gi;
		return string.replace(regex, "");
	};

	React.useEffect(() => {
		axios({
			method: "get",
			url: `https://newsapi.org/v2/top-headlines?q=${formatNameForSearch(
				companyName
			)}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
		}).then(({ data }) => {
			setNews(data.articles);
		});
	}, []);

	return (
		<>
			{news.map(article => {
				return (
					<div>
						<p>{article.title}</p>
						<p>{article.source.name}</p>
						<p>{article.description}</p>
						<hr />
					</div>
				);
			})}
		</>
	);
}
