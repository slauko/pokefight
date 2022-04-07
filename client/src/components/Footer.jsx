import React from 'react';
import '../styles/Footer.css';
import { FaGithub } from 'react-icons/fa';
export default function Footer() {
	return (
		<div className='Footer row'>
			<div className='col-md-2'></div>
			<div className='Items col-md'>
				<div className='Copyright col-md'>
					<p>&copy; 2022 WBS-WDG003 Group 4</p>
				</div>
				<div className='Socials col-md'>
					<FaGithub size={25} />
					<FaGithub size={25} />
					<FaGithub size={25} />
					<FaGithub size={25} />
				</div>
			</div>
		</div>
	);
}
