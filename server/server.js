const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Load env variables
require('dotenv').config();

// Process env loading
const port = process.env.PORT;
const database = process.env.DATABASE_URI;

// MongoDB connection
mongoose.connect(database, { useNewUrlParser: true });
const pokedex = mongoose.model(
	'pokedexes',
	mongoose.Schema({
		id: Number,
		name: Object,
		type: Array,
		base: Object,
	})
);
const users = mongoose.model(
	'users',
	mongoose.Schema({
		_id: mongoose.Schema.Types.ObjectId,
		username: String,
		password: String,
	})
);

const pokemons = mongoose.model(
	'pokemons',
	mongoose.Schema({
		_id: mongoose.Schema.Types.ObjectId,
		user_id: mongoose.Schema.Types.ObjectId,
		poke_id: Number,
		poke_name: String,
		level: Number,
		hp: Number,
	})
);

// Middleware
app.use(cors());
app.use(express.json());

// GET all users, without sending password
app.get('/users', (req, res) => {
	users
		.aggregate([{ $group: { _id: '$_id', username: { $first: '$username' } } }])
		.then((users) => {
			res.send(users);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});

app.get('/users/:id/pokemons', (req, res) => {
	pokemons
		.find({ user_id: req.params.id })
		.then((pokemons) => {
			res.send(pokemons);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});

// GET specific pokemon from user with _id
app.get('/users/:id1/pokemon/:id2', (req, res) => {
	pokemons
		.find({ user_id: req.params.id1, _id: req.params.id2 })
		.then((pokemon) => {
			res.send(pokemon);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});

//GET pokedex
app.get('/pokedex', (req, res) => {
	pokedex
		.find({})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});

// GET pokemon by id from pokedex
app.get('/pokedex/:id', (req, res) => {
	pokedex
		.find({ id: req.params.id })
		.then((pokemon) => {
			res.send(pokemon);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});

const getPokemonWithStats = async (pokemon) => {
	const rawPokemon = await pokedex.find({ id: pokemon.poke_id });
	const pokemonWithStats = {
		...pokemon,
		stats: {
			attack: rawPokemon[0].base.Attack * pokemon.level,
			defense: rawPokemon[0].base.Defense * pokemon.level,
			specialAttack: rawPokemon[0].base.Sp[' Attack'] * pokemon.level,
			specialDefense: rawPokemon[0].base.Sp[' Defense'] * pokemon.level,
			speed: rawPokemon[0].base.Speed * pokemon.level,
		},
		type: rawPokemon[0].type,
	};
	return pokemonWithStats;
};

const typestats = require('./data/type_stats.json');
const getPokemonEffectiveness = (pokemon1, pokemon2) => {
	let effectiveness = 1.0;
	pokemon1.type.forEach((typeName1) => {
		pokemon2.type.forEach((typeName2) => {
			let value = typestats[typeName1][typeName2];
			if (value) {
				effectiveness *= value;
			}
		});
	});

	return effectiveness;
};

const calcDamage = (pokemon1, pokemon2) => {
	const rawNormalDamage = pokemon1.stats.attack;
	const normalDamageReductionMod = 1000 / (1000 + pokemon2.stats.defense);
	const rawSpecialAttack = pokemon1.stats.specialAttack;
	const specialAttackReductionMod = 1000 / (1000 + pokemon2.stats.specialDefense);
	const effectiveness = getPokemonEffectiveness(pokemon1, pokemon2);
	const speedMod = pokemon1.stats.speed / pokemon2.stats.speed;

	const normalDamage = rawNormalDamage * effectiveness * normalDamageReductionMod;
	const specialDamage = rawSpecialAttack * effectiveness * specialAttackReductionMod;
	return (normalDamage + specialDamage) * speedMod;
};

const getCritChance = () => {
	return Math.random() * 0.5 + 0.5;
};

// FIGHT between two pokemons
app.get('/fight/:id1/:id2', (req, res) => {
	pokemons
		.find({ _id: req.params.id1 })
		.then((pokemon1) => {
			pokemons
				.find({ _id: req.params.id2 })
				.then((pokemon2) => {
					const hp1 = pokemon1[0].hp;
					const hp2 = pokemon2[0].hp;
					if (!hp1 || !hp2) {
						res.status(400).send('One Pokemon is dead');
					} else {
						getPokemonWithStats(pokemon1[0]).then((pokemon1WithStats) => {
							getPokemonWithStats(pokemon2[0]).then((pokemon2WithStats) => {
								let critChance1 = getCritChance();
								let critChance2 = getCritChance();
								let damage1 = Math.floor(
									calcDamage(pokemon1WithStats, pokemon2WithStats) * critChance1
								);
								let damage2 = Math.floor(
									calcDamage(pokemon2WithStats, pokemon1WithStats) * critChance2
								);

								const poke2HPAfterAttack = Math.max(0, pokemon2[0].hp - damage1);
								//update pokemon2 hp
								pokemons
									.updateOne({ _id: req.params.id2 }, { $set: { hp: poke2HPAfterAttack } })
									.then(() => {
										if (poke2HPAfterAttack > 0) {
											//update pokemon1 hp if pokemon2 is still alive
											const poke1HPAfterAttack = Math.max(0, pokemon1[0].hp - damage2);
											pokemons
												.updateOne({ _id: req.params.id1 }, { $set: { hp: poke1HPAfterAttack } })
												.then(() => {
													if (poke1HPAfterAttack == 0) {
														res.send({
															damage1: damage1,
															damage2: damage2,
															crit1: critChance1,
															crit2: critChance2,
															winner: 'Pokemon 2',
														});
													} else {
														res.send({
															damage1: damage1,
															damage2: damage2,
															crit1: critChance1,
															crit2: critChance2,
														});
													}
												});
										} else {
											res.send({
												damage1: damage1,
												damage2: 0,
												crit1: critChance1,
												crit2: critChance2,
												winner: 'Pokemon 1',
											});
										}
									});
							});
						});
					}
				})
				.catch((err) => {
					res.status(500).send(err);
				});
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});

const getBasePokemon = async (poke_id) => {
	const pokemon = await pokedex.find({ id: poke_id });
	const basePokemon = {
		poke_id: pokemon[0].id,
		level: 1,
		hp: pokemon[0].base.HP,
	};
	return basePokemon;
};
// CREATE a new pokemon for user
app.post('/pokemon', (req, res) => {
	const { userId, pokeId, pokeName } = req.body;
	getBasePokemon(pokeId).then((basePokemon) => {
		const newPokemon = {
			user_id: userId,
			...basePokemon,
			name: pokeName,
		};
		pokemons
			.insertOne(newPokemon)
			.then((result) => {
				res.send(result.ops[0]);
			})
			.catch((err) => {
				res.status(500).send(err);
			});
	});
});

// CREATE new user
app.post('/user/register', (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		res.status(400).send('Missing username or password');
	} else {
		users.find({ username }).then((user) => {
			if (user.length > 0) {
				res.status(400).send('Username already exists');
			} else {
				const hash = bcrypt.hashSync(password, 10);
				users
					.create({ _id: new mongoose.Types.ObjectId(), username, password: hash })
					.then((result) => {
						res.send(result);
					})
					.catch((err) => {
						console.log(err);
						res.status(500).send(err);
					});
			}
		});
	}
});

// LOGIN user
app.post('/user/login', (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		res.status(400).send('Missing username or password');
	} else {
		users
			.find({ username: username })
			.then((user) => {
				if (user.length > 0) {
					bcrypt.compare(password, user[0].password, (err, result) => {
						if (err) {
							res.status(500).send(err);
						} else {
							if (result) {
								res.send(user);
							} else {
								res.status(400).send('Wrong password');
							}
						}
					});
				} else {
					res.status(400).send('Username does not exist');
				}
			})
			.catch((err) => {
				res.status(500).send(err);
			});
	}
});

// Handle 404
app.use((req, res) => {
	res.status(404).send('404: Page not found');
});

// Listen to port
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
