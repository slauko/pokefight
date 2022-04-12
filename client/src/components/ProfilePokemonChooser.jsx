import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';

const STATS_URL = 'http://localhost:3001/pokemon/'; //process.env.REACT_APP_SERVER_CONNECTION + 'pokemon/';

export default function ProfilePokemonChooser({ pokemon, setSelected, selected }) {
	const [pokeWithStats, setStats] = useState([]);
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

	const handleSelectClick = () => {
		setSelected(pokemon._id);
	};

	return (
		<div className='ProfilePokemonChooser'>
			{1 && (
				<div className='ProfilePokemonChooser-Buttons'>
					<button onClick={handleSelectClick}>Select</button>
					{selected === pokemon._id && <label>selected</label>}
				</div>
			)}
			<div className='ProfilePokemonChooser-Image'>
				<div className='ProfilePokemonChooser-Name'>
					<p>{pokemon.poke_name}</p>
				</div>
				<img
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.poke_id}.svg`}
					alt=''
				/>
			</div>
			{pokeWithStats?.stats && (
				<div className='ProfilePokemonChooser-Stats'>
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
		</div>
	);
}
