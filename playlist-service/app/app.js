const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const path = require('path');

// Load environment variables
const env = require('dotenv');
const environment = env.config({ path: path.resolve(__dirname, '..', '.env') }).parsed;
// Exporting the modules
module.exports = {
    environment,
    express,
    mongoose,
    bcrypt,
    jwt
};

// Connect to MongoDB database
const mongooseConnection = require('./config/db');

// Router
const port = environment.PORT || 3000;
const routes = require('./interfaces/routeProvider/playlistRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).send('Something went wrong!');
});


// Start the server
app.listen(port, () => {
    console.log(`Auth service is running at port ${port}`);
});
