import React from 'react';
import '../styles/Footer.css';
import { FaGithub } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
export default function Footer() {
	return (
		<div className='Footer row'>
			<div className='col-md-2'></div>
			<div className='Items col-md'>
				<div className='Copyright col-md-3'>
					<p>&copy; 2022 Group 4</p>
					<p>WBS-WDG003</p>
				</div>
				<div className='Socials col-md'>
					<IconContext.Provider
						value={{
							size: '30px',
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
