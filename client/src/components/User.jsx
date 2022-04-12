import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/User.css';

export default function User({ user }) {
	const navigate = useNavigate();
	const handleProfileClick = () => {
		navigate(`/profile/${user._id}`);
	};

	return (
		<div className='User'>
			<div className='UserCard'>
				<div className='UserCard-header'>
					<div className='UserCard-header-left'>
						<img src={user.avatar} alt='' />
					</div>
					<div className='UserCard-header-right'>
						<h6>{user.username}</h6>
					</div>
				</div>
				<div className='UserCard-body'>
					<p>Games played: {user.games}</p>
					<p>
						W/L rate: {user.wins}/{user.lose}
					</p>
				</div>
				<button onClick={handleProfileClick}>Profile</button>
			</div>
		</div>
	);
}
