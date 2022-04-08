import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loadIcon from '../pictures/PokeBall.png';
import '../styles/Home.css';
import Card from './Card';

const POKEDEX_URL = process.env.REACT_APP_SERVER_CONNECTION + 'pokedex';
export default function Home() {
	const [pokedex, setPokedex] = useState([]);
	const [loading, setLoading] = useState(false);

	// load pokedex
	useEffect(() => {
		setLoading(true);
		axios
			.get(POKEDEX_URL)
			.then((res) => {
				setPokedex(res.data.slice(0, 649));
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [!pokedex]);

	if (loading) {
		return (
			<div className='Loading'>
				<img src={loadIcon} alt='' />
				<p>Loading...</p>
			</div>
		);
	}
	return (
		<div className='Home'>
			<div className='Pokedex'>
				{pokedex.map((pokemon) => {
					return <Card pokemon={pokemon} />;
				})}
			</div>
		</div>
	);
}
