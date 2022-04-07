import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const LOGIN_URL = 'http://localhost:3001/user/login'; //'http://173.212.218.93:49171/user/login';
const REGISTER_URL = 'http://localhost:3001/user/register';
const Login = ({ setUser }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleLoginClick = (e) => {
		e.preventDefault();
		const username = e.target.username.value;
		const password = e.target.password.value;
		axios
			.post(LOGIN_URL, { username, password })
			.then((res) => {
				setUser(res.data[0]);
				setError('');
				navigate('/profile');
			})
			.catch((err) => {
				setError(err.response.data);
			});
	};
	const handleRegisterClick = (e) => {
		e.preventDefault();
		const username = e.target.username.value;
		const password = e.target.password.value;
		axios
			.post(REGISTER_URL, { username, password })
			.then((res) => {
				setError('Registered successfully');
			})
			.catch((err) => {
				setError(err.response.data);
			});
	};

	return (
		<div>
			<form onSubmit={handleLoginClick} onReset={handleRegisterClick}>
				<input
					type='text'
					name='username'
					placeholder='Username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type='password'
					name='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type='submit'>Login</button>
				<button type='reset'>Register</button>
			</form>
			{error && <p>{error + '!'}</p>}
		</div>
	);
};

export default Login;
