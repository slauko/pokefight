const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// Load env variables
require('dotenv').config();

// Process env loading
const port = process.env.PORT;
const database = process.env.DATABASE_URI;

// MongoDB connection
mongoose.connect(database, { useNewUrlParser: true });
const users = mongoose.model(
	'users',
	mongoose.Schema({
		_id: Number,
		username: String,
		pokemons: Array,
	})
);
const pokemons = mongoose.model(
	'pokemons',
	mongoose.Schema({
		id: Number,
		name: Object,
		type: Array,
		base: Object,
	})
);

// Middleware
app.use(cors());
app.use(express.json());

// GET all users
app.get('/users', (req, res) => {
	users
		.find({})
		.then((users) => {
			res.send(users);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});

// GET pokemon list
app.get('/pokemon', (req, res) => {
	pokemons
		.find({})
		.then((pokemons) => {
			res.send(pokemons);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});

// GET pokemon by id
app.get('/pokemon/:id', (req, res) => {
	pokemons
		.find({ id: req.params.id })
		.then((pokemon) => {
			res.send(pokemon);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});

// GET pokemon by id and info
app.get('/pokemon/:id/:info', (req, res) => {
	pokemons
		.find({ id: req.params.id })
		.then((pokemon) => {
			res.send(pokemon[0][req.params.info]);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});

// FIGHT pokemon user1 vs pokemon user2 by id
app.get('/fight/:id1/:id2', (req, res) => {});

// Handle 404
app.use((req, res) => {
	res.status(404).send('404: Page not found');
});

// Listen to port
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
