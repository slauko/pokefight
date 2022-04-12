import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logoIcon from '../pictures/PokeFight.png';

function Navbar({ user }) {
	return (
		<div className='Navbar row'>
			<div className='col-md-1'></div>
			<div className='Logo col-md-2 col-sm-4 col-xs'>
				<img src={logoIcon} alt='' />
			</div>
			<div className='Links col-md col-sm-8 col-xs'>
				<Link to='/'>Pokedex</Link>
				<Link to='/user'> User </Link>
				{user ? (
					<Link to={`/profile/${user._id}`}> Profile </Link>
				) : (
					<Link to='/login'> Login </Link>
				)}
			</div>
		</div>
	);
}

export default Navbar;
