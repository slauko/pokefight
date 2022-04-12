import UserList from './components/UserList';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Fight from './components/Fight';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.css';

function App() {
	const [user, setUser] = useState(null);

	const setUserCookie = (user) => {
		const userCookie = JSON.stringify(user);
		localStorage.setItem('user', userCookie);
	};

	const getUserCookie = () => {
		const userCookie = localStorage.getItem('user');
		if (userCookie) {
			return JSON.parse(userCookie);
		}
		return null;
	};

	const deleteUserCookie = () => {
		localStorage.removeItem('user');
	};

	useEffect(() => {
		if (!user) {
			const userCookie = getUserCookie();
			if (userCookie) {
				setUser(userCookie);
			}
		}
	}, [user]);

	return (
		<div className='container'>
			<Navbar user={user} />
			<div className='Content row'>
				<Routes>
					<Route path='/' element={<Home localUser={user} />} />
					<Route path='/user' element={<UserList />} />
					<Route
						path='/login'
						element={<Login setUser={setUser} setUserCookie={setUserCookie} />}
					/>
					<Route
						path='/profile/:user_id'
						element={<Profile localUser={user} setUser={setUser} deleteCookie={deleteUserCookie} />}
					/>
					<Route path='/fight/:poke1_id/:poke2_id' element={<Fight />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}
export default App;
