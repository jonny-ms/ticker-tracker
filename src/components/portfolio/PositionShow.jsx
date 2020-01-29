import * as React from "react";
import { Link } from "react-router-dom";

export function PositionShow({ location }) {
	console.log(location.state.position);
	const position = location.state.position;

	return (
		<div className="list">
			<section className="portfolio">
				<article>
					<div>
						<h3>{position.name}</h3>
						<h3>
							{position.day_change} {position.currency}
						</h3>
					</div>
					<div>
						<h4>
							{position.stock_exchange_short} | {position.ticker}
						</h4>
						<h4> {position.change_pct}% </h4>
					</div>
					<hr />
					<div>
						<h3>Market Value</h3>
						<h3>
							{position.current_price * position.amount} {position.currency}
						</h3>
					</div>
					<div>
						<h4>Daily (P/L)</h4>
						<h4>
							{position.day_change * position.amount} ({position.change_pct}%)
						</h4>
					</div>
					<div>
						<h4>Open (P/L)</h4>
						<h4>
							{Math.round(
								(position.current_price - position.price) *
									position.amount *
									100
							) / 100}{" "}
							(
							{Math.round(
								(position.current_price / position.price - 1) * 10000
							) / 100}
							%)
						</h4>
					</div>
					<h5>
						BUY {position.amount} @ {position.price}
					</h5>
				</article>
				<Link to={`/stock/${position.ticker}`}>
					<button>detailed quote</button>
				</Link>
				{/* //TODO */}
				<button>edit position</button>
				<button>delete position</button>
				<button>close position</button>
			</section>
		</div>
	);
}
