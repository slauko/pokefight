const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config');
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Listen to port
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
