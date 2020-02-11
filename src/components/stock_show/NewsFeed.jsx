import * as React from "react";
import axios from "axios";

export function NewsFeed({ companyName }) {
	const [news, setNews] = React.useState([]);

	// Todo: check what other substring i should remove
	// const formatNameForSearch = string => {
	// 	const regex = /inc\.?/gi;
	// 	return string.replace(regex, "").trim();
	// };

	// React.useEffect(() => {
	// 	axios({
	// 		method: "get",
	// 		url: `https://newsapi.org/v2/everything?q=${companyName}&sortBy=publishedAt&page=1&excludeDomains=qq.com,inside.com.tw,droidsans.com&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
	// 	}).then(({ data }) => {
	// 		setNews(data.articles);
	// 	});
	// }, []);

	return (
		<>
			{news[0] && (
				<section className="news">
					<h2>News</h2>
					<hr />
					{news.map(article => {
						return (
							<>
								<article className="news-article">
									<div>
										<img
											src={article.urlToImage}
											alt="Thumbnail"
											className="news-article-thumbnail"
										/>
									</div>
									<div>
										<h5>{article.title}</h5>
										<p>{article.source.name}</p>
										<p>{article.description}</p>
										<a href={article.url}>link</a>
									</div>
								</article>
								<hr />
							</>
						);
					})}
				</section>
			)}
		</>
	);
}
