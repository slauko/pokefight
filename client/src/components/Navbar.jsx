import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logoIcon from '../pictures/PokeFight.png';

function Navbar() {
	return (
		<div className='Navbar row'>
			<div className='col-md-1'></div>
			<div className='Logo col-md-2'>
				<img src={logoIcon} alt='' />
			</div>
			<div className='Links col-md'>
				<Link to='/'>Pokedex</Link>
				<Link to='/user'> User </Link>
				<Link to='/login'> Login </Link>
			</div>
		</div>
	);
}

export default Navbar;
