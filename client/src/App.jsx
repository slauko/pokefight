import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import User from './components/User';
import { Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.css';
import Login from './components/Login';

function App() {
	return (
		<div className='container'>
			<Navbar />
			<div className='Content row'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/user' element={<User />} />
					<Route path='/login' element={<Login />} />
					<Route path='/pokemon/:id' element={<></>} />
					<Route path='/pokemon/:id/:info' element={<></>} />
				</Routes>
			</div>
			<Footer />
			{/* <div className='container'>
				<div className='left-content'>
					<Card pokemon={pokedata} loading={loading} infpok={(pok) => setpokdex(pok)} />
					<div className='btn-group'>
						{previousurl && (
							<button
								onClick={() => {
									setPokedata([]);
									setUrl(previousurl);
								}}
							>
								previous
							</button>
						)}
						{nexturl && (
							<button
								onClick={() => {
									setPokedata([]);
									setUrl(nexturl);
								}}
							>
								next
							</button>
						)}
					</div>
				</div>

				<div className='right-content '>
					<Pokeinfo data={pokdex} />
				</div>
			</div> */}
		</div>
	);
}
export default App;
