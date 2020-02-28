import React from "react";
import { Link } from "react-router-dom";

export function NavBar() {
	return (
		<>
			<nav>
				<Link to="/login">
					<img src="/images/user.svg" alt="user-profile" />
				</Link>
				<Link to="/">
					<h1>Tickr</h1>
				</Link>
				<Link to="/stocks">
					<img src="/images/search-orange.svg" alt="search-stocks" />
				</Link>
			</nav>
		</>
	);
}
