import * as React from "react";
import { Home } from "./components/Home";
import { Quote } from "./components/stock_show/Quote";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { PositionShow } from "./components/portfolio/PositionShow";
import { Search } from "./components/search/Search";

function App() {
	return (
		<Router>
			<div className="App">
				{/* <Link to={"/"}>
					<h1>Tickr</h1>
				</Link> */}
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/stocks" exact component={Search} />
					<Route path="/stocks/:ticker" component={Quote} />
					{/* Note position show path should use user portfolio position id */}
					<Route path="/position/:ticker" component={PositionShow} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
