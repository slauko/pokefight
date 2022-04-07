import React from 'react';
import '../styles/Card.css';

const getTypeColor = (type) => {
	switch (type) {
		case 'normal':
			return '#A8A878';
		case 'fire':
			return '#F08030';
		case 'water':
			return '#6890F0';
		case 'electric':
			return '#F8D030';
		case 'grass':
			return '#78C850';
		case 'ice':
			return '#98D8D8';
		case 'fighting':
			return '#C03028';
		case 'poison':
			return '#A040A0';
		case 'ground':
			return '#E0C068';
		case 'flying':
			return '#A890F0';
		case 'psychic':
			return '#F85888';
		case 'bug':
			return '#A8B820';
		case 'rock':
			return '#B8A038';
		case 'ghost':
			return '#705898';
		case 'dragon':
			return '#7038F8';
		case 'dark':
			return '#705848';
		case 'steel':
			return '#B8B8D0';
		case 'fairy':
			return '#EE99AC';
		default:
			return '#000000';
	}
};

export default function Card({ pokemon }) {
	return (
		<div className='Pokemon'>
			<div className='row' id='Name'>
				<p>{pokemon.id + '. ' + pokemon.name.english}</p>
			</div>
			<div className='row' id='Image'>
				<img
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
					alt={`Pokemon${pokemon.id}`}
				/>
			</div>
			<div className='row' id='Types'>
				{pokemon.type.map((type) => {
					const color = getTypeColor(type.toLowerCase());
					console.log(color);
					return (
						<div className='col-md' id='Type' style={{ backgroundColor: `${color}` }}>
							<p>{type}</p>
						</div>
					);
				})}{' '}
			</div>
		</div>
	);
}
