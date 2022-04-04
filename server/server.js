const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config');
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(config.database, { useNewUrlParser: true });

// Middleware
app.use(cors());
app.use(express.json());

// GET pokemon list
app.get('/pokemon', (req, res) => {
	const pokemon = require('./data/pokedex.json');
	res.send(pokemon);
});

// GET pokemon by id
app.get('/pokemon/:id', (req, res) => {
	const pokemon = require('./data/pokedex.json');
	const id = req.params.id;
	const pokemonById = pokemon.find((pokemon) => pokemon.id === id);
	res.send(pokemonById);
});

// GET pokemon by id and info
app.get('/pokemon/:id/:info', (req, res) => {
	const pokemon = require('./data/pokedex.json');
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
