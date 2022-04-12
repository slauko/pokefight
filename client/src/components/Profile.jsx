import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ProfilePokemon from './ProfilePokemon';
import ProfilePokemonChooser from './ProfilePokemonChooser';
import '../styles/Profile.css';

const USER_URL = 'http://localhost:3001/users/'; //process.env.REACT_APP_SERVER_CONNECTION + 'users/';
export default function Profile({ localUser, setUser, deleteCookie }) {
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [pokemons, setPokemons] = useState([]);
	const [myPokemons, setMyPokemons] = useState([]);
	const [selected, setSelected] = useState(0);

	const currentUserID = localUser ? localUser._id : null;
	const { user_id } = useParams();
	useEffect(() => {
		setLoading(true);
		axios
			.get(USER_URL + user_id)
			.then((res) => {
				setProfile(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
		axios
			.get(USER_URL + user_id + '/pokemons')
			.then((res) => {
				setPokemons(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
		if (currentUserID) {
			axios
				.get(USER_URL + currentUserID + '/pokemons')
				.then((res) => {
					setMyPokemons(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [user_id]);

	const navigate = useNavigate();
	const handleLogoutClick = () => {
		deleteCookie();
		setUser(null);
		navigate('/');
	};

	return (
		<div className='Profile'>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div className='ProfileContent row'>
					<div className='col-md'>
						<div className='ProfileInfo'>
							<h1>Profile</h1>
							<p>User ID: {profile._id}</p>
							<p>Username: {profile.username}</p>
							<p>Games played: {profile.games}</p>
							<p>
								W/L rate: {profile.wins}/{profile.lose}
							</p>
							{currentUserID === profile._id && (
								<button onClick={handleLogoutClick}>Log out</button>
							)}
						</div>

						<h1>Pokemon</h1>
						<div className='ProfilePokemons'>
							{pokemons.map((pokemon) => {
								return (
									<ProfilePokemon
										pokemon={pokemon}
										attackerID={selected}
										key={pokemon._id}
										canAttack={currentUserID !== profile._id}
									/>
								);
							})}
						</div>
					</div>
					{currentUserID !== profile._id && (
						<div className='col-lg-4 col-md-5 col-sm'>
							<div className='ProfilePokemonChoose'>
								<h1>Select a Pokemon</h1>
								{myPokemons.map((pokemon) => {
									return (
										<ProfilePokemonChooser
											pokemon={pokemon}
											setSelected={setSelected}
											selected={selected}
										/>
									);
								})}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
