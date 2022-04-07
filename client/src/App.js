import Card from './components/Card';
import Pokeinfo from './components/Pokeinfo';
import Navbar from './components/Navbar';
import Home from './components/Home';
import User from './components/User';
import axios from 'axios';
import './styles/App.css';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import BannerImage from './photos/pokeball.png';
//import "./styles/Main.css";
function App() {
	const [pokedata, setPokedata] = useState([]);
	const [loading, setLoading] = useState(true);
	const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
	const [nexturl, setNexturl] = useState();
	const [previousurl, setPreviousurl] = useState();
	const [pokdex, setpokdex] = useState();
	const pokfun = async () => {
		setLoading(true);
		const res = await axios.get(url);
		//console.log(res.data.results);
		setNexturl(res.data.next);
		setPreviousurl(res.data.previous);
		getPokemon(res.data.results);
		setLoading(false);
		// console.log(pokedata);
	};
	const getPokemon = async (res) => {
		res.map(async (item) => {
			const result = await axios.get(item.url);
			//console.log(result);
			setPokedata((state) => {
				state = [...state, result.data];
				state.sort((a, b) => (a.id > b.id ? 1 : -1));
				return state;
			});
		});
	};

	useEffect(() => {
		pokfun();
	}, [url]);
	return (
		<>
			<div className='Banner' style={{ backgroundImage: `url(${BannerImage})` }}></div>
			<Navbar />
			<Routes>
				<Route path='/' element={<></>} />
				<Route path='/pokemon/:id' element={<Home />} />
				<Route path='/pokemon/:id/:info' element={<User />} />
			</Routes>
			<div className='container'>
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
			</div>
		</>
	);
}
export default App;
