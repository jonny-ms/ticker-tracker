// TODO refactor conditional styling

import * as React from "react";
import { Link } from "react-router-dom";

export function PositionShow({ location }) {
	console.log(location.state.position);
	const position = location.state.position;

	const editPosition = () => {
		console.log("Edit");
	};
	const closePosition = () => {
		console.log("Close");
	};
	const deletePosition = () => {
		console.log("Delete");
	};

	return (
		<>
			<nav>
				<Link to="/">
					<img src="/images/back-arrow.svg" alt="" />
				</Link>
			</nav>

			<div className="list">
				<section className="portfolio">
					<article>
						<div>
							<h3>{position.name}</h3>
							{position.day_change > 0 && (
								<h3 className="profit">
									{position.day_change} {position.currency}
								</h3>
							)}
							{position.day_change < 0 && (
								<h3 className="loss">
									{position.day_change} {position.currency}
								</h3>
							)}
							{position.day_change === 0 && (
								<h3 className="break-even">
									{position.day_change} {position.currency}
								</h3>
							)}
						</div>
						<div>
							<h4>
								{position.stock_exchange_short} | {position.ticker}
							</h4>
							{position.change_pct > 0 && (
								<h4 className="profit"> {position.change_pct}% </h4>
							)}
							{position.change_pct < 0 && (
								<h4 className="loss"> {position.change_pct}% </h4>
							)}
							{position.change_pct === 0 && (
								<h4 className="break-even"> {position.change_pct}% </h4>
							)}
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
							{position.day_change > 0 && (
								<h4 className="profit">
									{Math.round(position.day_change * position.amount * 100) /
										100}{" "}
									({position.change_pct}%)
								</h4>
							)}
							{position.day_change < 0 && (
								<h4 className="loss">
									{Math.round(position.day_change * position.amount * 100) /
										100}{" "}
									({position.change_pct}%)
								</h4>
							)}
							{position.day_change === 0 && (
								<h4 className="break-even">
									{Math.round(position.day_change * position.amount * 100) /
										100}{" "}
									({position.change_pct}%)
								</h4>
							)}
						</div>
						<div>
							<h4>Open (P/L)</h4>
							{position.current_price - position.price > 0 && (
								<h4 className="profit">
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
							)}
							{position.current_price - position.price < 0 && (
								<h4 className="loss">
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
							)}
							{position.current_price - position.price === 0 && (
								<h4 className="break-even">
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
							)}
						</div>
						<h5>
							BUY {position.amount} @ {position.price}
						</h5>
					</article>
					<Link to={`/stocks/${position.ticker}`}>
						<button>detailed quote</button>
					</Link>
					{/* //TODO */}
					<button onClick={editPosition}>edit position</button>
					<button onClick={deletePosition}>delete position</button>
					<button onClick={closePosition}>close position</button>
				</section>
			</div>
		</>
	);
}
