import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Home from './components/Home';
import User from './components/User';

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.css';

function App() {
	const [user, setUser] = useState(null);
	return (
		<div className='container'>
			<Navbar user={user} />
			<div className='Content row'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/user' element={<User />} />
					<Route path='/login' element={<Login setUser={setUser} />} />;
					<Route path='/profile' element={<Profile user={user} />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}
export default App;
