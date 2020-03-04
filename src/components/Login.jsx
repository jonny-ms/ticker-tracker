import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";

export function Login({ history }) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const handleSubmit = e => {
		e.preventDefault();
		// tickr api /login post request
		axios
			.post("/api/login", {
				email,
				password
			})
			.then(({ data }) => {
				// store JWT to a global state (redux or useContext?)
				console.log(data.access_token);
				Cookie.set("tickr-token", data.access_token);
				// redirection to root
				history.push("/");
			})
			.catch(err => {
				console.log(err.message);
				if (err.response.data.message === "User not found")
					return alert("Email not found");
				if (err.response.data.message === "Wrong credentials")
					return alert("Incorrect password");
			});
	};

	const validateForm = () => {
		return email.length > 0 && password.length > 5;
	};

	let loginButton = "login-button";
	if (validateForm()) {
		loginButton += "-is-active";
	}

	return (
		<>
			<nav>
				<Link to="/">
					<img src="/images/back-arrow.svg" alt="" />
				</Link>
			</nav>
			<div className="login">
				<form onSubmit={handleSubmit} className="login-form">
					<label>EMAIL</label>
					<input
						autoFocus
						type="email"
						name="email"
						alt="Login email input"
						placeholder="me@email.com"
						value={email}
						onChange={event => setEmail(event.target.value)}
						className="login-input"
					/>
					<label>PASSWORD</label>
					<input
						type="password"
						name="password"
						alt="Login password input"
						placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
						value={password}
						onChange={event => setPassword(event.target.value)}
						className="login-input"
					/>
					<button
						type="submit"
						name="login"
						disabled={!validateForm()}
						className={loginButton}
					>
						Login
					</button>
				</form>
			</div>
		</>
	);
}
