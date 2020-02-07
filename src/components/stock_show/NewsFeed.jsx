import * as React from "react";
import axios from "axios";

export function NewsFeed({ companyName }) {
	const [news, setNews] = React.useState([]);

	// Todo: check what other substring i should remove
	const formatNameForSearch = string => {
		const regex = /inc\.?/gi;
		return string.replace(regex, "").trim();
	};

	// React.useEffect(() => {
	// 	axios({
	// 		method: "get",
	// 		url: `https://newsapi.org/v2/top-headlines?q=${formatNameForSearch(
	// 			companyName
	// 		)}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
	// 	}).then(({ data }) => {
	// 		setNews(data.articles);
	// 	});
	// }, []);

	return (
		<>
			{news[0] && (
				<section className="portfolio">
					<h2>News</h2>
					<hr />
					{news.map(article => {
						return (
							<article>
								<p>{article.title}</p>
								<p>{article.source.name}</p>
								<p>{article.description}</p>
								<a href={article.url}>link</a>
								<hr />
							</article>
						);
					})}
				</section>
			)}
		</>
	);
}
