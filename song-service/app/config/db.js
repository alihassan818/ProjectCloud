const app = require('../app');

const dbUrl = app.environment.DB_CONNECTION_URL;

app.mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });

module.exports = app.mongoose.connection;
