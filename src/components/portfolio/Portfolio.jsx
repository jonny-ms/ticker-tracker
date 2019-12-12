import * as React from "react";

export function Portfolio() {
	return (
		<>
			<p>Last Updated at: {"{...}"}</p>
			<div>
				<span>Market Value --- </span>
				<span>
					{"{currency}"} {"{currentValue}"}
				</span>
			</div>
			<div>
				<span>Daily (P/L?) --- </span>
				<span>
					{"{valueChange}"} {"({percentChange})"}
				</span>
			</div>
			<div>
				<span>Open (P/L?) --- </span>
				<span>
					{"{valueChange}"} {"({percentChange})"}
				</span>
			</div>
			{/* //! Toggle between different views. Open positions. Closed positions. What views/info do I want to see? Probably not a select tag if only two views*/}
			<div>
				<select>
					<option>Open</option>
					<option>Close</option>
				</select>
			</div>
			{/* //! Tab */}
			<div>
				<button>Daily</button>
				<button>Open</button>
			</div>
			{/* //! This section is the PortfolioList */}
			<section>
				{/* //! This article is a PortfolioItem */}
				<article>
					<div>
						<span>companyName</span>
						<span>valueChange</span>
					</div>
					<div>
						<span>exchange | ticker</span>
						<span>percentChange</span>
					</div>
					<p>BUY 22 @ 47.24</p>
				</article>
			</section>
		</>
	);
}
