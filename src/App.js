import * as React from "react";
import { Home } from "./components/Home";
import { Quote } from "./components/stock_show/Quote";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PositionShow } from "./components/portfolio/PortfolioShow";

function App() {
	return (
		<Router>
			<div className="App">
				<h1>Tickr</h1>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/stock/:ticker" component={Quote} />
					{/* Note position show path should use user portfolio position id */}
					<Route path="/position/:ticker" component={PositionShow} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
