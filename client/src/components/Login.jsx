import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import axios from 'axios';

const LOGIN_URL = process.env.REACT_APP_SERVER_CONNECTION + 'user/login';
const REGISTER_URL = process.env.REACT_APP_SERVER_CONNECTION + 'user/register';
const Login = ({ setUser, setUserCookie }) => {
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
				setUserCookie(res.data[0]);
				setError('Logged in successfully');
				setTimeout(() => {
					navigate('/profile/' + res.data[0]._id);
				}, 500);
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
				setUser(res.data);
				setUserCookie(res.data);
				setError('Registered successfully');
				setTimeout(() => {
					navigate('/profile/' + res.data._id);
				}, 500);
			})
			.catch((err) => {
				setError(err.response.data);
			});
	};

	return (
		<div className='Login row'>
			<div className='Form col-xs-4 col-md-5 col-xl-4'>
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
					{error ? (
						<p>{error + '!'}</p>
					) : (
						<p>
							<br />
						</p>
					)}
				</form>
			</div>
		</div>
	);
};

export default Login;
