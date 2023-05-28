const app = require('../app');

const dbUrl = app.environment.DB_CONNECTION_URL;

app.mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    });

module.exports = app.mongoose.connection;
