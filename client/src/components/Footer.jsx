import React from 'react';
import '../styles/Footer.css';
import { FaGithub } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
export default function Footer() {
	return (
		<div className='Footer row'>
			<div className='col-md-9'>
				<div className='Copyright row'>
					<p>Created 2022 by WBS-WDG003 Group 4</p>
				</div>
				<div className='Copyright Trademark row'>
					<p>Pokémon and Pokémon character names are trademarks of Nintendo.</p>
				</div>
			</div>
			<div className='Items col-md-2 col-sm-12'>
				<div className='Socials col-md'>
					<IconContext.Provider
						value={{
							size: '20px',
							style: {
								borderRadius: '50%',
								boxShadow:
									'1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black, inset 0px 0px 15px black',
							},
						}}
					>
						<FaGithub />
						<FaGithub />
						<FaGithub />
						<FaGithub />
					</IconContext.Provider>
				</div>
			</div>
		</div>
	);
}
