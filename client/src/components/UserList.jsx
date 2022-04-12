import User from './User';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import '../styles/UserList.css';

const USERLIST_URL = process.env.REACT_APP_SERVER_CONNECTION + 'users/';
export default function UserList() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);

	// load users
	useEffect(() => {
		setLoading(true);
		axios
			.get(USERLIST_URL)
			.then((res) => {
				setUsers(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [!users]);

	return (
		<div className='UserList'>
			{loading ? (
				<p>Loading...</p>
			) : (
				users.map((user) => {
					return <User user={user} key={uuid()} />;
				})
			)}
		</div>
	);
}
