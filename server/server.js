const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config');
const port = process.env.PORT || 3001;

// MongoDB connection
mongoose.connect(config.database, { useNewUrlParser: true });

// Middleware
app.use(cors());
app.use(express.json());

const pokemon = require('./data/pokedex.json'); // TODO: Change to an PokeAPI when ready e.g. https://pokeapi.co/docs/v2
// GET pokemon list
app.get('/pokemon', (req, res) => {
	res.send(pokemon);
});

// GET pokemon by id
app.get('/pokemon/:id', (req, res) => {
	const id = req.params.id;
	const pokemonById = pokemon.find((pokemon) => pokemon.id === id);
	res.send(pokemonById);
});

// GET pokemon by id and info
app.get('/pokemon/:id/:info', (req, res) => {
	const id = req.params.id;
	const info = req.params.info;
	const pokemonById = pokemon.find((pokemon) => pokemon.id === id);
	const pokemonInfo = pokemonById[info];
	res.send(pokemonInfo);
});

// Handle 404
app.use((req, res) => {
	res.status(404).send('404: Page not found');
});

// Listen to port
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
