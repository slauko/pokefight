import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

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
	const [isFlipped, setIsFlipped] = useState(false);
	return (
		<ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
			<div
				className='Pokemon'
				onClick={() => {
					setIsFlipped(!isFlipped);
				}}
			>
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
						return (
							<div className='col-md' id='Type' style={{ backgroundColor: `${color}` }}>
								<p>{type}</p>
							</div>
						);
					})}
				</div>
			</div>
			<div
				className='Pokemon'
				onClick={() => {
					setIsFlipped(!isFlipped);
				}}
			>
				<div className='row' id='BackName'>
					<div className='col-md'>
						<p>{pokemon.name.english}</p>
					</div>
					<div className='col-md' id='Image'>
						<img
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
							alt={`Pokemon${pokemon.id}`}
						/>
					</div>
				</div>
				<div className='row' id='BackStats'>
					<p>HP: {pokemon.base.HP}</p>
					<p>Attack: {pokemon.base.Attack}</p>
					<p>Defense: {pokemon.base.Defense}</p>
					<p>Sp. Attack: {pokemon.base.Sp[' Attack']}</p>
					<p>Sp. Defense: {pokemon.base.Sp[' Defense']}</p>
				</div>
				<div className='row' id='Add'>
					<button>Add to your Pokemons</button>
				</div>
			</div>
		</ReactCardFlip>
	);
}
