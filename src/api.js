import axios from "axios";

const yahooFinanceApi = {
	getAutocomplete: params =>
		axios({
			method: "get",
			url: `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/auto-complete?lang=en&region=US&query=${params}`,
			responseType: "stream",
			headers: {
				"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
				"x-rapidapi-key": process.env.REACT_APP_YAHOO_FINANCE_API_KEY
			}
		})
};

// const worldTradingBase = axios.create({
// 	baseURL: "https://api.worldtradingdata.com/api/v1/"
// });

const worldTradingApiKey = process.env.REACT_APP_WORLD_TRADING_API_KEY;

const worldTradingApi = {
	getRealTimeQuote: symbol => axios.get(`/stock/${symbol}`),
	getIntradayData: (symbol, range, interval) =>
		axios.get("https://intraday.worldtradingdata.com/api/v1/intraday", {
			params: { symbol, range, interval, api_token: worldTradingApiKey }
		}),
	getHistoricalData: (symbol, date) =>
		axios.get("/history", {
			params: { symbol, date_from: date, api_token: worldTradingApiKey }
		})
};

const newsApi = {
	getEverythingByPublishedAt: params =>
		axios.get(
			`https://newsapi.org/v2/everything?q=${params}&sortBy=publishedAt&page=1&excludeDomains=qq.com,inside.com.tw,droidsans.com&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
		)
};

export default {
	yahooFinanceApi,
	worldTradingApi,
	newsApi
};
