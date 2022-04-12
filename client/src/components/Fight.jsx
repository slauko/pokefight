import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfilePokemon from './ProfilePokemon';
import axios from 'axios';
import '../styles/Fight.css';

const FIGHT_ULT = process.env.REACT_APP_SERVER_CONNECTION + 'fight/';
const POKEMON_URL = process.env.REACT_APP_SERVER_CONNECTION + 'pokemons/';
export default function Fight() {
	const { poke1_id, poke2_id } = useParams();
	const [pokemon1, setPokemon1] = useState(null);
	const [pokemon2, setPokemon2] = useState(null);

	const [fight, setFight] = useState(null);
	const [reload, setReload] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setReload(true);
	}, []);

	const update = reload === true;
	useEffect(() => {
		if (update) {
			setTimeout(() => {
				setReload(true);
			}, 2000);
			setTimeout(() => {
				setReload(false);
			}, 1000);
			//UPDATE POKEMON
			axios
				.get(POKEMON_URL + poke1_id)
				.then((res) => {
					setPokemon1(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
			axios
				.get(POKEMON_URL + poke2_id)
				.then((res) => {
					setPokemon2(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
			//START FIGHT
			axios
				.get(FIGHT_ULT + poke1_id + '/' + poke2_id)
				.then((res) => {
					setError(null);
					setFight(res.data);
				})
				.catch((err) => {
					setError(err.response.data);
					console.log(err.response.data);
				});
			console.log(fight);
		}
	}, [update]);

	if (!fight) {
		return <></>;
	}

	return (
		<div className='Fight'>
			{error ? (
				<div className='Error'>
					<h1>{error}</h1>
				</div>
			) : (
				<div className='Error'></div>
			)}
			{pokemon1 && pokemon2 && (
				<div className='Arena'>
					<div className='FightItem'>
						<div className='FightCard'>
							<h2>You</h2>
							<ProfilePokemon pokemon={pokemon1} />
							<p>Damage: {fight.damage1}</p>
						</div>
					</div>
					<div className='VS'>
						VS.
						{fight.winner && (
							<div className='Winner'>
								<h2>Winner:</h2>
								<h3>{fight.winner}</h3>
							</div>
						)}
					</div>
					<div className='FightItem'>
						<div className='FightCard'>
							<h2>Enemy</h2>
							<ProfilePokemon pokemon={pokemon2} />
							<p>Damage: {fight.damage2}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
