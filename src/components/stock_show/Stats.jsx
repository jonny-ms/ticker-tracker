import * as React from "react";

export function Stats({ summary }) {
	const formatNumber = number => {
		let num = Number(number);
		if (num / 1000000000 > 1) {
			num = Math.round(num / 10000000) / 100;
			return num.toString() + "B";
		} else if (num / 1000000 > 1) {
			num = Math.round(num / 10000) / 100;
			return num.toString() + "M";
		} else if (num / 1000 > 1) {
			let str = num.toString();
			if (num / 100000 > 1) {
				return str.slice(0, 3) + "," + str.slice(3);
			} else if (num / 10000 > 1) {
				return str.slice(0, 2) + "," + str.slice(2);
			} else {
				return str.slice(0, 1) + "," + str.slice(1);
			}
		} else {
			return num;
		}
	};

	return (
		<div className="list">
			<section className="portfolio">
				<h2>Stats</h2>
				<hr />

				<table className="stats-table">
					<tbody>
						<tr>
							<td>
								<h5>Open</h5>
								<h4>{formatNumber(summary.price_open)}</h4>
							</td>
							<td>
								<h5>Mkt cap</h5>
								<h4>{formatNumber(summary.market_cap)}</h4>
							</td>
						</tr>
						<tr>
							<td>
								<h5>High</h5>
								<h4>{formatNumber(summary.day_high)}</h4>
							</td>
							<td>
								<h5>52W high</h5>
								<h4>{formatNumber(summary["52_week_high"])}</h4>
							</td>
						</tr>
						<tr>
							<td>
								<h5>Low</h5>
								<h4>{formatNumber(summary.day_low)}</h4>
							</td>
							<td>
								<h5>52W low</h5>
								<h4>{formatNumber(summary["52_week_high"])}</h4>
							</td>
						</tr>
						<tr>
							<td>
								<h5>Vol</h5>
								<h4>{formatNumber(summary.volume)}</h4>
							</td>
							<td>
								<h5>Avg vol</h5>
								<h4>{formatNumber(summary.volume_avg)}</h4>
							</td>
						</tr>
						<tr>
							<td>
								<h5>P/E</h5>
								<h4>{summary.pe}</h4>
							</td>
							<td>
								<h5>EPS</h5>
								<h4>{summary.eps}</h4>
							</td>
						</tr>
						<tr>
							<td style={{ width: "100%" }}>
								<h5>Exchange</h5>
								<h4>{summary.stock_exchange_short}</h4>
							</td>
						</tr>
					</tbody>
				</table>
			</section>
		</div>
	);
}
