const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');


// Load environment variables
const env = require('dotenv');
const environment = env.config({ path: path.resolve(__dirname, '..', '.env') }).parsed;
// Exporting the modules
module.exports = {
    environment,
    express,
    axios
};



const routes = require('./interfaces/routeProvider/routes');
const port = environment.PORT || 3307;



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
app.listen(port, () => {
    console.log(`Login service listening at port ${port}`);
});


