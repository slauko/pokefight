import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import '../styles/Card.css';
import Modal from 'react-modal';

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

const ADD_URL = rocess.env.REACT_APP_SERVER_CONNECTION + 'pokemon';
export default function Card({ pokemon, localUser }) {
	const [isFlipped, setIsFlipped] = useState(false);
	const [name, setName] = useState(pokemon.name.english);
	const [openModal, setOpenModal] = useState(false);

	const addPokemon = (name) => {
		axios
			.post(ADD_URL, {
				userId: localUser._id,
				pokeId: pokemon.id,
				pokeName: name,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleAddPokemon = () => {
		if (name.length > 0) {
			addPokemon(name);
		}
		setOpenModal(false);
	};

	Modal.setAppElement('#root');
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
							<div
								className='col-md'
								id='Type'
								style={{ backgroundColor: `${color}` }}
								key={uuid()}
							>
								<p>{type}</p>
							</div>
						);
					})}
				</div>
			</div>
			<div className='Pokemon'>
				<div
					className='row'
					id='BackName'
					onClick={() => {
						setIsFlipped(!isFlipped);
					}}
				>
					<p>{pokemon.id + '. ' + pokemon.name.english}</p>
				</div>
				<div
					className='col-md'
					id='BackImage'
					onClick={() => {
						setIsFlipped(!isFlipped);
					}}
				>
					<img
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
						alt={`Pokemon${pokemon.id}`}
					/>
				</div>
				<div
					className='row'
					id='BackStats'
					onClick={() => {
						setIsFlipped(!isFlipped);
					}}
				>
					<div id='Stat'>
						<div id='StatName'>
							<p>HP:</p>
						</div>
						<div id='StatValue'>
							<p>{pokemon.base.HP}</p>
						</div>
					</div>
					<div id='Stat'>
						<div id='StatName'>
							<p>Speed:</p>
						</div>
						<div id='StatValue'>
							<p>{pokemon.base.Speed}</p>
						</div>
					</div>
					<div id='Stat'>
						<div id='StatName'>
							<p>Attack:</p>
						</div>
						<div id='StatValue'>
							<p>{pokemon.base.Attack}</p>
						</div>
					</div>
					<div id='Stat'>
						<div id='StatName'>
							<p>Defense:</p>
						</div>
						<div id='StatValue'>
							<p>{pokemon.base.Defense}</p>
						</div>
					</div>
					<div id='Stat'>
						<div id='StatName'>
							<p>Sp.Attack:</p>
						</div>
						<div id='StatValue'>
							<p>{pokemon.base.Sp[' Attack']}</p>
						</div>
					</div>
					<div id='Stat'>
						<div id='StatName'>
							<p>Sp.Defense:</p>
						</div>
						<div id='StatValue'>
							<p>{pokemon.base.Sp[' Defense']}</p>
						</div>
					</div>
				</div>
				<div className='row' id='Add'>
					{localUser ? (
						<button
							onClick={() => {
								setOpenModal(true);
							}}
						>
							Add to your Pokemon
						</button>
					) : null}
					<Modal isOpen={openModal}>
						<div className='modalLeft'>
							<h5>Name your Pokemon:</h5>
							<input
								type='text'
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
							<button onClick={handleAddPokemon}>Add</button>
							{name.length === 0 && <label>Name cant be empty!</label>}
						</div>
						<div className='modalRight'>
							<button id='closeModalButton' onClick={() => setOpenModal(false)}>
								X
							</button>
						</div>
					</Modal>
				</div>
			</div>
		</ReactCardFlip>
	);
}
