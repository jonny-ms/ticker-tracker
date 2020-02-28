import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function Register() {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [passwordConfirmation, setPasswordConfirmation] = React.useState("");

	const handleSubmit = e => {
		e.preventDefault();
		if (password !== passwordConfirmation) {
			return alert("Password and password confirmation do not match");
		}
		// tickr api /registration post request
		axios
			.post("/api/registration", {
				email,
				password
			})
			.then(resp => {
				console.log(resp);
				// store JWT to a global state (redux or useContext?)
				// redirection to root
			})
			.catch(err => {
				if (err.response.status === 409) alert(err.response.data.message);
			});
	};

	const validateForm = () => {
		return email.length > 0 && password.length > 5;
	};

	let registerButton = "register-button";
	if (validateForm()) {
		registerButton += "-is-active";
	}

	return (
		<>
			<nav>
				<Link to="/">
					<img src="/images/back-arrow.svg" alt="" />
				</Link>
			</nav>
			<div className="register">
				<form onSubmit={handleSubmit} className="register-form">
					<label>EMAIL</label>
					<input
						autoFocus
						type="email"
						name="email"
						alt="Register email input"
						placeholder="me@email.com"
						value={email}
						onChange={event => setEmail(event.target.value)}
						className="register-input"
					/>
					<label>PASSWORD</label>
					<input
						type="password"
						name="password"
						alt="Register password input"
						placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
						value={password}
						onChange={event => setPassword(event.target.value)}
						className="register-input"
					/>
					<label>CONFIRM PASSWORD</label>
					<input
						type="password"
						name="password-confirmation"
						alt="Register password confirmation input"
						placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
						value={passwordConfirmation}
						onChange={event => setPasswordConfirmation(event.target.value)}
						className="register-input"
					/>

					<button
						type="submit"
						name="register"
						disabled={!validateForm()}
						className={registerButton}
					>
						Register
					</button>
				</form>
			</div>
		</>
	);
}
