import React from 'react';
import '../styles/Pokeinfo.css';
const [pokedata, setPokedata] = useState([]);
const [loading, setLoading] = useState(true);
const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
const [nexturl, setNexturl] = useState();
const [previousurl, setPreviousurl] = useState();
const [pokdex, setpokdex] = useState();
const pokfun = async () => {
	setLoading(true);
	const res = await axios.get(url);
	//console.log(res.data.results);
	setNexturl(res.data.next);
	setPreviousurl(res.data.previous);
	getPokemon(res.data.results);
	setLoading(false);
	// console.log(pokedata);
};
const getPokemon = async (res) => {
	res.map(async (item) => {
		const result = await axios.get(item.url);
		//console.log(result);
		setPokedata((state) => {
			state = [...state, result.data];
			state.sort((a, b) => (a.id > b.id ? 1 : -1));
			return state;
		});
	});
};

useEffect(() => {
	pokfun();
}, [url]);

function Pokeinfo({ data }) {
	console.log(data);
	return (
		<div>
			{!data ? (
				''
			) : (
				<>
					<h1>{data.name}</h1>
					<img
						className='image'
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
						alt='charmander'
					/>
					<div className='abilities'>
						{data.abilities.map((poke) => {
							return (
								<div className='group'>
									<h1>{poke.ability.name}</h1>
								</div>
							);
						})}
					</div>
					<div className='base-stats'>
						{data.stats.map((poke) => {
							return (
								<>
									<h3>
										{poke.stat.name}:{poke.base_stat}
									</h3>
								</>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}

export default Pokeinfo;
