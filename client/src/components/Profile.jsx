import React from 'react';

export default function Profile({ user }) {
	console.log(user);
	return (
		<div>
			<h1>Profile</h1>
			<p>User ID: {user._id}</p>
			<p>Username: {user.username}</p>
		</div>
	);
}
