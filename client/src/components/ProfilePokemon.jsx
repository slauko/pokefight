import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/Profile.css';

const STATS_URL = process.env.REACT_APP_SERVER_CONNECTION + 'pokemon/';

export default function ProfilePokemon({ pokemon, attackerID, canAttack, heal }) {
	const [pokeWithStats, setStats] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(STATS_URL + pokemon._id + '/stats')
			.then((res) => {
				setStats(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const handleAttackClick = () => {
		navigate('/fight/' + attackerID + '/' + pokemon._id);
	};
	const handleHealClick = () => {
		axios.put(STATS_URL + pokemon._id + '/heal');
		navigate(0);
	};
	return (
		<div className='ProfilePokemonCard'>
			<div className='ProfilePokemonCard-Name'>
				<p>{pokemon.poke_name}</p>
			</div>
			<div className='ProfilePokemonCard-Image'>
				<img
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.poke_id}.svg`}
					alt=''
				/>
			</div>
			{pokeWithStats?.stats && (
				<div className='ProfilePokemonCard-Stats'>
					<div id='Stat'>
						<div id='StatName'>
							<p>HP:</p>
						</div>
						<div id='StatValue'>
							<p>{pokemon.hp}</p>
						</div>
					</div>
					<div id='Stat'>
						<div id='StatName'>
							<p>Level:</p>
						</div>
						<div id='StatValue'>
							<p>{pokemon.level}</p>
						</div>
					</div>
					<div id='Stat'>
						<div id='StatName'>
							<p>Speed:</p>
						</div>
						<div id='StatValue'>
							<p>{pokeWithStats.stats.speed}</p>
						</div>
					</div>
					<div id='Stat'>
						<div id='StatName'>
							<p>Attack:</p>
						</div>
						<div id='StatValue'>
							<p>{pokeWithStats.stats.attack}</p>
						</div>
					</div>
					<div id='Stat'>
						<div id='StatName'>
							<p>Defense:</p>
						</div>
						<div id='StatValue'>
							<p>{pokeWithStats.stats.defense}</p>
						</div>
					</div>
					<div id='Stat'>
						<div id='StatName'>
							<p>Sp.Attack:</p>
						</div>
						<div id='StatValue'>
							<p>{pokeWithStats.stats.specialAttack}</p>
						</div>
					</div>
					<div id='Stat'>
						<div id='StatName'>
							<p>Sp.Defense:</p>
						</div>
						<div id='StatValue'>
							<p>{pokeWithStats.stats.specialDefense}</p>
						</div>
					</div>
				</div>
			)}
			<div className='ProfilePokemonCard-Buttons'>
				{attackerID && canAttack ? <button onClick={handleAttackClick}>Attack!</button> : null}
				{heal ? <button onClick={handleHealClick}>Heal</button> : null}
			</div>
		</div>
	);
}
